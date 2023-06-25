FROM node:16.15.0-slim AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

# release image

FROM node:16.15.0-slim AS release
RUN npm i -g pm2@latest
WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

# Add user so we don't need --no-sandbox.
RUN addgroup --system kings && adduser --system --ingroup kings david \
    && mkdir -p /home/david/Downloads /app \
    && chown -R david /home/david \
    && chown -R david /app

# Run everything after as non-privileged user.
USER david

COPY --from=build /app/dist ./dist

CMD ["pm2", "start", "-s", "dist/main.js", "--name", "app", "--no-daemon"]