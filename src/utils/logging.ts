import * as readline from "readline";
import { LogOptions } from "../types";

/**
 * Replaces the current log message with the new one
 * @param message The new message to log
 */
export function replaceLog(message: string) {
  clearLog();
  process.stdout.write(message + "\r");
}

/**
 * Logs a message to the console
 * @param message The message to log
 * @param options The options to use
 */
export function logMessage(message: string, options?: LogOptions) {
  const { prefix = "", suffix = "", replace = false } = options || {};
  if (replace) {
    replaceLog(prefix + message + suffix);
  } else {
    console.log(prefix + message + suffix);
  }
}

/**
 * Clears the current log message
 */
export function clearLog() {
  readline.clearLine(process.stdout, 0);
}
