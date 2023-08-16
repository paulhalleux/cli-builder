import { ArgumentsCamelCase, Options, PositionalOptions } from "yargs";

export type BaseCommand<ArgsType = any> = {
  trigger: string;
  command: string;
  describe: string;
  positional?: { [key: string]: PositionalOptions };
  options?: Record<string, Options>;
  handler: (argv: ArgumentsCamelCase<ArgsType>) => void;
};
