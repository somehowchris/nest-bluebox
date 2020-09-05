import { DeepPartial } from 'typeorm';
export declare class AbstractEntity {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    constructor(input?: DeepPartial<AbstractEntity>);
}
