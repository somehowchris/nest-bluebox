export interface BaseEnvironmentInterface {
  readonly nodeEnv: string;
  readonly port: number;
  readonly app: {
    readonly name: string;
  };
}
