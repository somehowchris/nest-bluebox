import { DynamicModule } from '@nestjs/common';
import { BaseEnvironmentInterface } from './env.interface';
import { EnvironmentValidationType } from './env-validation.type';
import { Schema } from '@hapi/joi';
export declare class EnvironmentModule {
    static register<T extends BaseEnvironmentInterface>(validator: EnvironmentValidationType<T, Schema>): DynamicModule;
}
