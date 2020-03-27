import { ValidationEnvironmentInterface } from './environment.interface';
import { boolean } from '@hapi/joi';
import { EnvironmentValidationType } from '../../env/env-validation.type';

export const ValidationEnvironmentValidation: EnvironmentValidationType<
  ValidationEnvironmentInterface
> = {
  showErrors: boolean().default(true),
  onlyWhitelistedProperties: boolean().default(true),
  transformInputs: boolean().default(true),
};
