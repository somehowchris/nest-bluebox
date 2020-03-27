import { DynamicModule } from '@nestjs/common';
import { DynamicModuleConfigProvider } from '../http/http.type';
export declare class AuthModule {
    static registerAsync(options: DynamicModuleConfigProvider<string> & {
        useGlobal?: boolean;
        secureHealthEndpoint?: boolean;
    }): DynamicModule;
}
