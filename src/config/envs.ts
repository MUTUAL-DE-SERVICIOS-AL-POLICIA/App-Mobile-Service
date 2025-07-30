import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  NATS_SERVERS: string[];
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_SYNCHRONIZE: boolean;
  DB_SCHEMA: string;
}

const envsSchema = joi
  .object({
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    DB_SYNCHRONIZE: joi
      .string()
      .valid('true', 'false')
      .default('false'),
  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
  DB_SYNCHRONIZE: process.env.DB_SYNCHRONIZE?.toLowerCase(),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = {
  ...value,
  DB_SYNCHRONIZE: value.DB_SYNCHRONIZE === 'true',
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