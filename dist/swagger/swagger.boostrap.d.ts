import { SwaggerDocumentOptions } from './swagger.interface';
import { INestApplication } from '@nestjs/common';
export declare class SwaggerBootstrap {
    private static logger;
    static useSwagger: (app: INestApplication, options: SwaggerDocumentOptions) => void;
}
