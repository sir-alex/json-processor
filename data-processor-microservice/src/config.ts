export type ICONFIG = typeof CONFIG;

export const CONFIG = {
  MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/cardnexus-test',
  EXTERNAL_CARDS: (process.env.EXTERNAL_CARDS || []) as string,
  JSON_BUFFER_SIZE: parseInt(process.env.JSON_BUFFER_SIZE || '500'),
  MIN_POOL_SIZE: parseInt(process.env.MIN_POOL_SIZE || '5'),
  MAX_POOL_SIZE: parseInt(process.env.MAX_POOL_SIZE || '90'),
  ENV_NAME: process.env.ENV_NAME || 'production',
}
