import {
  DEFAULT_CRYPT_SALT,
  DEFAULT_LOGGER_LOG_LEVEL,
  DEFAULT_LOGGER_MAX_FILE_SIZE,
  DEFAULT_PORT,
  DEFAULT_TOKEN_EXPIRE_TIME,
  DEFAULT_TOKEN_REFRESH_EXPIRE_TIME,
} from './constants';

export default () => ({
  port: parseInt(process.env.PORT, 10) || DEFAULT_PORT,
  bcrypt: {
    saltRounds: parseInt(process.env.CRYPT_SALT, 10) || DEFAULT_CRYPT_SALT,
  },
  jwt: {
    accessSecret: process.env.JWT_SECRET_KEY,
    refreshSecret: process.env.JWT_SECRET_REFRESH_KEY,
    accessExpire: process.env.TOKEN_EXPIRE_TIME || DEFAULT_TOKEN_EXPIRE_TIME,
    refreshExpire:
      process.env.TOKEN_REFRESH_EXPIRE_TIME ||
      DEFAULT_TOKEN_REFRESH_EXPIRE_TIME,
  },
  logger: {
    logLevel:
      parseInt(process.env.LOGGER_LOG_LEVEL, 10) || DEFAULT_LOGGER_LOG_LEVEL,
    maxFileSize:
      parseInt(process.env.LOGGER_MAX_FILE_SIZE, 10) ||
      DEFAULT_LOGGER_MAX_FILE_SIZE,
  },
});
