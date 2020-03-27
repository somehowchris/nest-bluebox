import { parse, DotenvParseOutput } from 'dotenv';
import { ObjectSchema, object, Schema } from '@hapi/joi';
import { readFileSync, existsSync, lstatSync } from 'fs';
import { BaseEnvironmentInterface } from './env.interface';
import { flattenEnvObject, unflattenEnv, KeyValueString } from './env.helper';
import { EnvironmentValidationType } from './env-validation.type';
import { Logger, Injectable, Inject } from '@nestjs/common';
import { BaseEnvironmentValidation } from './env.validation';
import {
  ENVIRONMENT_FILE_PATHS,
  ENVIRONMENT_VALIDATOR,
} from './environment.constants';

@Injectable()
export class EnvService<T extends BaseEnvironmentInterface> {
  private readonly logger = new Logger(EnvService.name);

  readonly env: T;

  constructor(
    @Inject(ENVIRONMENT_FILE_PATHS) private readonly filePath: string[],
    @Inject(ENVIRONMENT_VALIDATOR)
    private readonly validator?: EnvironmentValidationType<T, Schema>,
  ) {
    let config = process.env;

    if (typeof this.filePath === 'string') {
      this.filePath = [this.filePath];
    }

    for (const path of this.filePath) {
      if (existsSync(path) === true && lstatSync(path).isFile() === true) {
        this.logger.log('Loading configuration file from ' + path);
        config = parse(readFileSync(path));
        break;
      }
    }

    this.logger.log('Validating environment');
    const { validatedEnvConfig, objectTree } = this.validateInput(config);

    this.logger.log('Injecting environment variables into application');
    this.env = {} as T;
    unflattenEnv(this.env, validatedEnvConfig, objectTree);
  }

  /**
   * Ensures all needed variables are set, and returns the validated JavaScript object
   * including the applied default values.
   */
  private validateInput(
    envConfig: DotenvParseOutput | any,
  ): {
    validatedEnvConfig: KeyValueString;
    objectTree: EnvironmentValidationType<T, string>;
  } {
    const [envValidationConfig, objectTree] = flattenEnvObject(
      {} as EnvironmentValidationType<T, string>,
      this.validator || BaseEnvironmentValidation,
    );

    const envVarsSchema: ObjectSchema = object(envValidationConfig);

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(
      envConfig,
      {
        stripUnknown: true,
      },
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }

    return {
      validatedEnvConfig,
      objectTree,
    };
  }
}
