export interface DatabaseEnvironmentInterface {
    readonly database: {
        readonly type: string;
        readonly host: string;
        readonly port: number;
        readonly username: string;
        readonly password?: string;
        readonly database: string;
        readonly synchronize?: boolean;
    };
}
