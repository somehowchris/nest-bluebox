import { EnvironmentValidationType } from '../../env/env-validation.type';
import { DatabaseEnvironmentInterface } from './environment.interface';
import { Schema } from '@hapi/joi';
export declare const DatabaseEnvironmentValidation: EnvironmentValidationType<DatabaseEnvironmentInterface, Schema>;
