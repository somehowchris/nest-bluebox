import { BaseEnvironmentInterface } from './env.interface';
import { Schema } from '@hapi/joi';
export declare type EnvironmentValidationType<T = BaseEnvironmentInterface, E = Schema> = {
    [P in keyof T]: T[P] extends object ? EnvironmentValidationType<T[P]> : E;
};
