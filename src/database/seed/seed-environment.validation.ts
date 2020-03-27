import { BaseEnvironmentValidation } from '../../env/env.validation';
import { DatabaseEnvironmentValidation } from '../environment/environment.validation';
import { LoggerEnvironmentValidation } from '../../logger/environment/environment.validation';

export const SeedEnvironmentValidation = {
  ...BaseEnvironmentValidation,
  ...DatabaseEnvironmentValidation,
  ...LoggerEnvironmentValidation,
};
