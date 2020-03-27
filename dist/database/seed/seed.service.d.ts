import { Connection } from 'typeorm';
import { SeedInterface } from './seed.interface';
export declare class SeedService {
    private readonly connection;
    private readonly logger;
    constructor(connection: Connection);
    run(seeds: SeedInterface[]): Promise<void>;
    load(): Promise<SeedInterface[]>;
}
