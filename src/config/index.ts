export const config = {
  db: {
    type: process.env.DB_TYPE ?? 'mysql',
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    maxPoolConnection: process.env.DB_MAX_POOL_CONNECTION ?? 10,
  },
};
