import { string, number } from '@hapi/joi';
import { EnvironmentValidationType } from './env-validation.type';
import { BaseEnvironmentInterface } from './env.interface';

export const BaseEnvironmentValidation: EnvironmentValidationType<
  BaseEnvironmentInterface
> = {
  nodeEnv: string().default('devlopment'),
  port: number().default(3000),
  app: {
    name: string().required(),
  },
};
