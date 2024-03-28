const stringUrl = process.env.DB_STRING_URL;
const urlObject = new URL(stringUrl as string);

export const config = {
  db: {
    type: 'postgres',
    host: urlObject.hostname,
    port: parseInt(urlObject.port),
    username: urlObject.username,
    password: urlObject.password,
    database: urlObject.pathname.slice(1),
    schema: 'public',
    maxPoolConnection: process.env.DB_MAX_POOL_CONNECTION ?? 10,
  },
};
