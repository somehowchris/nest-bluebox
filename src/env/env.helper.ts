import { isSchema } from '@hapi/joi';
import { BaseEnvironmentInterface } from './env.interface';
import { EnvironmentValidationType } from './env-validation.type';
import { camel2underscore } from '../utils/string';

export type JoinEnvironments<T, K extends BaseEnvironmentInterface> = T & K;

export const flattenEnvObject = <T>(
  objectRef: EnvironmentValidationType<T, string>,
  obj: object,
  parent: string = undefined,
  res: object = {},
): [object, EnvironmentValidationType<T, string>] => {
  if (obj !== undefined) {
    for (const key in obj) {
      const propName = parent ? parent + '_' + key : key;

      if (typeof obj[key] === 'object' && isSchema(obj[key]) === false) {
        objectRef[key] = {};
        flattenEnvObject(objectRef[key], obj[key], propName, res);
      } else {
        res[camel2underscore(propName).toUpperCase()] = obj[key];
        objectRef[key] = camel2underscore(propName).toUpperCase();
      }
    }

    return [res, objectRef];
  }
};

export interface KeyValueString {
  [key: string]: string;
}

export const unflattenEnv = <T extends BaseEnvironmentInterface>(
  envClass: T,
  env: KeyValueString,
  treeValueMap: EnvironmentValidationType<T, string>,
): void => {
  Object.getOwnPropertyNames(treeValueMap).forEach(el => {
    envClass[el] = envClass[el] === undefined ? {} : envClass[el];

    if (typeof treeValueMap[el] === 'object') {
      unflattenEnv(envClass[el], env, treeValueMap[el]);
      return;
    }

    envClass[el] = env[treeValueMap[el]];
  });
};
