import { BaseCommand } from "./base-command";

/**
 Interface representing a command manager.
 **/
export interface CommandManager {
  /*
  An array of command that extends BaseCommand.
  @type {Array<BaseCommand>}
  */
  commands: Array<BaseCommand>;

  /**
   Registers a new command class that extends CommandModule to the command manager.
   @param {BaseCommand} commandClass - A command to be added to the cli.
   */
  register(commandClass: BaseCommand): void;

  /**
   Runs the command manager to parse arguments and execute the specified command.
   */
  run(): void;
}
