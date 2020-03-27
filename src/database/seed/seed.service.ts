import { Injectable, Logger } from '@nestjs/common';
import { Connection } from 'typeorm';
import { findProjectRoot, readJsonFile } from './seed.util';
import * as path from 'path';
import * as glob from 'glob';
import { SeedInterface } from './seed.interface';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(private readonly connection: Connection) {}

  async run(seeds: SeedInterface[]): Promise<void> {
    const results = await Promise.all(
      seeds.map(async el => {
        const entityManager = this.connection.createEntityManager();

        const start = new Date().getTime();

        this.logger.log(`Running ${el.constructor.name}`);

        const failedRun = err => {
          this.logger.error(`${el.constructor.name} Failed`, err.toString());
          return err.toString();
        };

        try {
          return new Promise(resolveRun => {
            entityManager
              .transaction(async manager => {
                el.run(manager)
                  .catch(err => resolveRun(failedRun(err)))
                  .then(() => {
                    this.logger.log(
                      `Ending ${
                        el.constructor.name
                      } after ${(new Date().getTime() - start) / 1000} seconds`,
                    );
                    resolveRun({});
                  });
              })
              .catch(err => resolveRun(failedRun(err)));
          });
        } catch (e) {
          return failedRun(e);
        }
      }),
    );

    const failedSeeds = results.filter(el => typeof el === 'string');

    if (failedSeeds.length > 0) {
      this.logger.warn(`${failedSeeds.length} seed attemts failed`);
    }

    this.logger.log(
      `${results.filter(el => typeof el === 'object').length} seeds succeeded`,
    );
  }

  async load(): Promise<SeedInterface[]> {
    const projectRoot = findProjectRoot();

    const info = readJsonFile(path.join(projectRoot, 'package.json'));

    this.logger.log('Loading seeds in context of project: ' + info.name);

    return new Promise((resolve, reject) => {
      const event = glob(
        path.join(projectRoot, '**/*.seed.js'),
        {},
        async (err, files = []) => {
          if (files.length === 0) {
            reject(new Error('No seeds found.'));
          }
          const seedsPerFile = files.map(el => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const seed = require(el);
            const seeds: SeedInterface[] = [];

            Object.keys(seed).forEach(expo => {
              if (typeof seed[expo] === 'function') {
                try {
                  const seedInstance = new seed[expo]();
                  if (
                    seedInstance.run &&
                    typeof seedInstance.run === 'function'
                  ) {
                    this.logger.log(`Found seed ${seed[expo].name}`);
                    return seeds.push(seedInstance);
                  }
                } finally {
                }
              }
            });

            return seeds as SeedInterface[];
          });

          if (seedsPerFile === []) {
            return resolve([]);
          }

          if (seedsPerFile === [seedsPerFile[0]]) {
            return resolve([...seedsPerFile[0]]);
          }

          const totalSeeds = seedsPerFile.reduce(
            (prev, curr) => (prev ? [...prev, ...curr] : [...curr]),
            [],
          );

          resolve(totalSeeds);
        },
      );
      event.on('error', err => reject(err));
    });
  }
}
