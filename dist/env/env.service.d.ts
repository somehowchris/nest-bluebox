import { Schema } from '@hapi/joi';
import { BaseEnvironmentInterface } from './env.interface';
import { EnvironmentValidationType } from './env-validation.type';
export declare class EnvService<T extends BaseEnvironmentInterface> {
    private readonly filePath;
    private readonly validator?;
    private readonly logger;
    readonly env: T;
    constructor(filePath: string[], validator?: EnvironmentValidationType<T, Schema>);
    private validateInput;
}
