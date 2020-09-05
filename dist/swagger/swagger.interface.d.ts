import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
export interface SwaggerDocumentOptions {
    readonly title: string;
    readonly description?: string;
    readonly prefix?: string;
    readonly version?: string;
    readonly tags?: string[];
    readonly basePaths?: string[];
    readonly termsOfService?: string;
    readonly contact?: {
        readonly name: string;
        readonly url: string;
        readonly email: string;
    };
    readonly license?: {
        readonly name: string;
        readonly url: string;
    };
    readonly security?: {
        readonly name: string;
        readonly options: SecuritySchemeObject;
    };
}
