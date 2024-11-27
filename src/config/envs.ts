import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string[];
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_AUTO_LOAD_ENTITIES: boolean;
  DB_SYNCHRONIZE: boolean;
  DB_SCHEMA: string;
  FTP_HOST: string;
  FTP_USERNAME: string;
  FTP_PASSWORD: string;
  FTP_ROOT: string;
  FTP_SSL: boolean;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(), 
    NATS_SERVERS: joi.array().items(joi.string()).required(),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const PortEnvs = {
  port: envVars.PORT,
};
//Configuración con el servidor
export const NastEnvs = {
  natsServers: envVars.NATS_SERVERS,
};
//Configuración con la base de datos principal
export const DbEnvs = {
  dbPassword: envVars.DB_PASSWORD,
  dbDatabase: envVars.DB_DATABASE,
  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbUsername: envVars.DB_USERNAME,
  dbSynchronize: envVars.DB_SYNCHRONIZE,
  dbSchema: envVars.DB_SCHEMA,
};

export const envsFtp = {
  ftpHost: envVars.FTP_HOST,
  ftpUsername: envVars.FTP_USERNAME,
  ftpPassword: envVars.FTP_PASSWORD,
  ftpRoot: envVars.FTP_ROOT,
  ftpSsl: envVars.FTP_SSL,
};
