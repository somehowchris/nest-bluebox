import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { EnvironmentModule } from '../../env/env.module';
import { SeedEnvironmentValidation } from './seed-environment.validation';
import { SeedService } from './seed.service';
import { LoggerModule } from '../../logger/logger.module';
import { JoinEnvironments } from '../../env/env.helper';
import { BaseEnvironmentInterface } from '../../env/env.interface';
import { DatabaseEnvironmentInterface } from '../environment/environment.interface';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ENVIRONMENT } from '../../env/environment.constants';

@Module({
  imports: [
    LoggerModule,
    EnvironmentModule.register(SeedEnvironmentValidation),
    DatabaseModule.registerAsync({
      useFactory: (
        env: JoinEnvironments<
          DatabaseEnvironmentInterface,
          BaseEnvironmentInterface
        >,
      ) => {
        return {
          ...env.database,
          autoLoadEntities: true,
        } as TypeOrmModuleAsyncOptions;
      },
      inject: [ENVIRONMENT],
    }),
  ],
  providers: [SeedService],
})
export class SeedModule {
  constructor(private readonly seedService: SeedService) {}

  public async seed(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.seedService
        .load()
        .then(seeds => {
          this.seedService
            .run(seeds)
            .then(() => {
              resolve();
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }
}
