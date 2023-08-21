import { parseNumber } from '@shared/helpers/parse-number';
import {
  DEFAULT_CRYPT_SALT,
  DEFAULT_LOGGER_LOG_LEVEL,
  DEFAULT_LOGGER_MAX_FILE_SIZE,
  DEFAULT_PORT,
  DEFAULT_TOKEN_EXPIRE_TIME,
  DEFAULT_TOKEN_REFRESH_EXPIRE_TIME,
} from './constants';

export default () => ({
  port: parseNumber(process.env.PORT) ?? DEFAULT_PORT,
  bcrypt: {
    saltRounds: parseNumber(process.env.CRYPT_SALT) ?? DEFAULT_CRYPT_SALT,
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
      parseNumber(process.env.LOGGER_LOG_LEVEL) ?? DEFAULT_LOGGER_LOG_LEVEL,
    maxFileSize:
      parseNumber(process.env.LOGGER_MAX_FILE_SIZE) ??
      DEFAULT_LOGGER_MAX_FILE_SIZE,
  },
});
