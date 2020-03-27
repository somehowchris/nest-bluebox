import { EnvironmentValidationType } from '../../env/env-validation.type';
import { LoggerEnvironmentInterface } from './environment.interface';
import { Schema, boolean } from '@hapi/joi';

export const LoggerEnvironmentValidation: EnvironmentValidationType<
  LoggerEnvironmentInterface,
  Schema
> = {
  logger: {
    useElastic: boolean().default(false),
  },
};
