import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { BaseEnvironmentInterface } from '../env/env.interface';
export declare class RouterMiddleware implements NestMiddleware {
    readonly env: BaseEnvironmentInterface;
    private readonly logger;
    private readonly format;
    constructor(env: BaseEnvironmentInterface);
    use(req: Request, res: Response, next: NextFunction): any;
}
