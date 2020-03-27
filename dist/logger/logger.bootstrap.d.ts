import { INestApplication } from '@nestjs/common';
import { BaseEnvironmentInterface } from '../env/env.interface';
export declare class LoggerBootstrap {
    static useLogger: (app: INestApplication) => void;
    static notifyServerIsListening: (env: BaseEnvironmentInterface) => () => void;
}
