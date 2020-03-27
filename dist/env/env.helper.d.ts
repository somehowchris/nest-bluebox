import { BaseEnvironmentInterface } from './env.interface';
import { EnvironmentValidationType } from './env-validation.type';
export declare type JoinEnvironments<T, K extends BaseEnvironmentInterface> = T & K;
export declare const flattenEnvObject: <T>(objectRef: EnvironmentValidationType<T, string>, obj: object, parent?: string, res?: object) => [object, EnvironmentValidationType<T, string>];
export interface KeyValueString {
    [key: string]: string;
}
export declare const unflattenEnv: <T extends BaseEnvironmentInterface>(envClass: T, env: KeyValueString, treeValueMap: EnvironmentValidationType<T, string>) => void;
