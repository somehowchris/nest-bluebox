import * as path from 'path';
import { existsSync, readFileSync } from 'fs';

export const findProjectRoot = (dir = process.cwd()) => {
  if (existsSync(dir + '/package.json')) {
    return dir;
  }

  if (path.dirname(dir) === '/') {
    throw new Error('No package.json found');
  }

  try {
    return findProjectRoot(path.dirname(dir));
  } catch (e) {
    throw new Error('No package.json found');
  }
};

export const readJsonFile = filePath => {
  return JSON.parse(readFileSync(filePath).toString());
};
