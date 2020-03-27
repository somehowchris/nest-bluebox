import { SeedService } from './seed.service';
export declare class SeedModule {
    private readonly seedService;
    constructor(seedService: SeedService);
    seed(): Promise<void>;
}
