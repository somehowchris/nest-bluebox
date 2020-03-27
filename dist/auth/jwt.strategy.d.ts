import { UserInterface } from '../user/user.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly publicKey;
    private readonly issuer;
    private readonly logger;
    constructor(publicKey: string, issuer: string);
    validate(payload: UserInterface): UserInterface;
}
export {};
