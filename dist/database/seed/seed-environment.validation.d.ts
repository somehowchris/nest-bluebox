export declare const SeedEnvironmentValidation: {
    logger: import("../..").EnvironmentValidationType<{
        readonly useElastic: boolean;
    }, any>;
    database: import("../..").EnvironmentValidationType<{
        readonly type: string;
        readonly host: string;
        readonly port: number;
        readonly username: string;
        readonly password?: string;
        readonly database: string;
        readonly synchronize?: boolean;
    }, any>;
    nodeEnv: any;
    port: any;
    app: import("../..").EnvironmentValidationType<{
        readonly name: string;
    }, any>;
};
