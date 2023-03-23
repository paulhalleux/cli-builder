import { ArgumentsCamelCase, Options, PositionalOptions } from "yargs";

export type BaseCommand<ArgsType = any> = {
  command: string;
  describe: string;
  positional?: { [key: string]: PositionalOptions };
  options?: Options[];
  handler: (argv: ArgumentsCamelCase<ArgsType>) => void;
};
