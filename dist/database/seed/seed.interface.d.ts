import { EntityManager } from 'typeorm';
export interface SeedInterface {
    run(entityManager: EntityManager): Promise<void>;
}
