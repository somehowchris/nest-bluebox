import { LogLevels } from './log-levels.enum';
import { capitalizeFirstLetter } from '../utils/string';
import { format } from 'winston';
import { blue, yellow, grey, bold, cyan, red, white } from 'colors/safe';
import { TransformableInfo } from 'logform';
import { BaseEnvironmentInterface } from '../env/env.interface';

const colorPerLevel = (
  level: string,
  defaultColor: (value: string) => string,
) => {
  switch (level) {
    case LogLevels.ERROR:
      return red;
    case LogLevels.WARN:
      return yellow;
    default:
      return defaultColor;
  }
};

const formatMeta = (
  env: BaseEnvironmentInterface,
): ((meta: object) => string | any) => {
  return env.nodeEnv === 'development'
    ? meta =>
        meta['0'] && meta['0'].startsWith && meta['0'].startsWith('Error')
          ? meta['0']
          : JSON.parse(JSON.stringify(meta))
    : meta => JSON.stringify(meta);
};

const localDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString();
};

export const nestLikeConsoleFormat = (env: BaseEnvironmentInterface) =>
  format.printf(
    ({ context, level, timestamp, message, ...meta }: TransformableInfo) => {
      return (
        `${bold(
          colorPerLevel(level, blue)(
            `[${capitalizeFirstLetter(env.app.name)}]`,
          ),
        )} ` +
        `${colorPerLevel(level, blue)(capitalizeFirstLetter(level))}\t` +
        ('undefined' !== typeof timestamp
          ? colorPerLevel(level, white)(`${localDate(timestamp)} `)
          : '') +
        ('undefined' !== typeof context
          ? colorPerLevel(level, white)(`${yellow('[' + context + ']')} `)
          : '') +
        `${colorPerLevel(level, cyan)(message)} - ` +
        `${colorPerLevel(level, grey)(formatMeta(env)(meta))}`
      );
    },
  );
