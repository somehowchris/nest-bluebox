import { Type, DynamicModule, ForwardReference } from '@nestjs/common';
export interface DynamicModuleConfigProvider<T> {
    imports?: Array<Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference>;
    useFactory: (...args: any[]) => T | Promise<T>;
    inject?: any[];
}
