import * as env from 'env-var';

export default () => ({
  PORT: env.get('PORT').default(3005).asInt(),
  DATABASE_URI: env.get('DATABASE_URI').required().asUrlString(),
  env: env.get('NODE_ENV').default('local').asString(),
});
