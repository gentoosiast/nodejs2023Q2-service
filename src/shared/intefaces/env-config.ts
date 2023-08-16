export interface EnvironmentVariables {
  PORT: number;
  CRYPT_SALT: number;
  JWT_SECRET_KEY: string;
  JWT_SECRET_REFRESH_KEY: string;
  TOKEN_EXPIRE_TIME: string;
  TOKEN_REFRESH_EXPIRE_TIME: string;
  CUSTOM_NETWORK_SUBNET: string;
  PGPORT: number;
  POSTGRES_USER: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DB: string;
  DATABASE_URL: string;
}
