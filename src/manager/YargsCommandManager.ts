import yargs, { Arguments, Argv } from "yargs";
import { hideBin } from "yargs/helpers";
import { BaseCommand } from "../BaseCommand";
import { CommandManager } from "./CommandManager";

/**
 * A class that implements the CommandManager interface and uses yargs to manage commands.
 * @class
 * @implements CommandManager
 */
export class YargsCommandManager implements CommandManager {
  // An array of command classes that extends BaseCommand.
  commands: Array<BaseCommand> = [];

  constructor(private readonly scriptName: string) {
    this.scriptName = scriptName;
  }

  /**
   * Registers a new command class that extends BaseCommand to the command manager.
   * @param {new (): T} commandClass - A command class that extends BaseCommand.
   * @template T - The type of the command class.
   */
  register(commandClass: BaseCommand): void {
    this.commands.push(commandClass);
  }

  /**
   * Runs the command manager to parse arguments and execute the specified command.
   * @returns {Promise<void>} - A promise that resolves when all commands have been executed.
   */
  public async run(): Promise<void> {
    const argv = hideBin(process.argv);
    let y = yargs(argv);

    // Set the script name
    y.scriptName(this.scriptName);

    // Add each registered command to yargs.
    for (const command of this.commands) {
      const builder = (y: Argv) => {
        command.positional && Object.keys(command.positional)?.forEach((k) => y.positional(k, command.positional![k]));
        command.options?.forEach(y.options);
      };
      y = y.command(command.command, command.describe, builder, command.handler);
    }

    // Parse the arguments and execute the specified command.
    const result: Arguments<any> = await y.parseAsync(argv).catch(() => y.showHelp());
    const command = result._[0];
    if (!command) {
      y.showHelp();
      process.exit(1);
    }
  }
}
