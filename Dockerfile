FROM node:20.5-slim AS backend_build
WORKDIR /app

COPY ./backend/package*.json ./

RUN npm ci

COPY ./backend .

RUN npm run build

FROM node:16.15.0-slim AS frontend_build
WORKDIR /app

COPY ./frontend/package*.json ./
COPY ./frontend/yarn.lock ./


RUN yarn install --frozen-lockfile

COPY ./frontend .

RUN yarn build

# release image

FROM node:20.5-slim AS release

WORKDIR /app

COPY --from=backend_build /app/node_modules/ ./node_modules
COPY --from=backend_build /app/package*.json ./

RUN npm prune --production

# Add user so we don't need --no-sandbox.
RUN addgroup --system kings && adduser --system --ingroup kings david \
    && mkdir -p /home/david/Downloads /app \
    && chown -R david /home/david \
    && chown -R david /app

# Run everything after as non-privileged user.
USER david

COPY --from=backend_build /app/dist ./
COPY --from=frontend_build /app/dist ./client

CMD ["node", "main.js"]