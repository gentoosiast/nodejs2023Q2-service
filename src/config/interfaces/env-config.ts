export interface EnvironmentVariables {
  port: number;
  bcrypt: {
    saltRounds: number;
  };
  jwt: {
    accessSecret: string;
    refreshSecret: string;
    accessExpire: string | number;
    refreshExpire: string | number;
  };
  logger: {
    logLevel: number;
    maxFileSize: number;
  };
}
