import { EnvironmentValidationType } from '../../env/env-validation.type';
import { DatabaseEnvironmentInterface } from './environment.interface';
import { Schema, string, number, boolean } from '@hapi/joi';

export const DatabaseEnvironmentValidation: EnvironmentValidationType<
  DatabaseEnvironmentInterface,
  Schema
> = {
  database: {
    type: string().required(),
    host: string().required(),
    port: number().required(),
    username: string().required(),
    password: string(),
    database: string().required(),
    synchronize: boolean().default(false),
  },
};
