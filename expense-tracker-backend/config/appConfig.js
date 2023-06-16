const dotenv = require("dotenv");

dotenv.config();

const appConfig = {
  HOSTNAME: process.env.DB_HOSTNAME,
  PORT: process.env.PORT,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
};

module.exports = appConfig;
