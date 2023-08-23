import * as fs from "fs/promises";
import { GetExtensionOptions, MkDirOptions, WriteOptions } from "../types/file";
import { WriteFileOptions } from "fs";
import glob, { Options as GlobOptions } from "fast-glob";
import { rimraf, RimrafOptions } from "rimraf";
import { copy as fsCopy } from "fs-extra";

/**
 * Check if a file exists
 * @param path Path to the file
 * @returns True if the file exists, false otherwise
 */
export async function exists(path: string): Promise<boolean> {
  return await fs
    .access(path)
    .then(() => true)
    .catch(() => false);
}

/**
 * Read a file and return its content
 * @param path Path to the file
 * @returns The content of the file
 */
export async function read(path: string): Promise<string> {
  return await fs.readFile(path, { encoding: "utf-8" });
}

/**
 * Read all files and return their content
 * @param paths Paths to the files
 * @returns The content of the files
 */
export async function readAll(paths: string[]): Promise<Record<string, string>> {
  return await Promise.all(
    paths.map(read).map(async (content, index) => {
      const path = paths[index];
      return { path, content: await content };
    }),
  ).then((files) => {
    const result: Record<string, string> = {};
    for (const file of files) {
      result[file.path] = file.content;
    }
    return result;
  });
}

/**
 * Read a directory and return its content
 * @param path Path to the directory
 * @returns The content of the directory
 */
export async function readDir(path: string): Promise<string[]> {
  return await fs.readdir(path);
}

/**
 * Delete the path recursively using rimraf
 * @param path Path to the directory to remove
 * @param options Options for removing the directory
 * @returns A promise that resolves when the directory is removed
 */
export async function remove(path: string, options?: RimrafOptions): Promise<void> {
  await rimraf(path, options);
}

/**
 * Read a glob and return its content
 * @param pattern Glob pattern
 * @param options Options for reading the glob
 * @returns The content of the glob
 */
export async function readGlob(pattern: string, options?: GlobOptions): Promise<string[]> {
  return await glob(pattern, options);
}

/**
 * Write a file
 * @param path Path to the file
 * @param content Content to write
 * @param options Options for writing the file
 * @returns A promise that resolves when the file is written
 */
export async function write(path: string, content: string, options?: WriteOptions & WriteFileOptions): Promise<void> {
  if (options?.cleanEndOfLine) content = content.replace(/\r\n/g, "\n");
  if ((await exists(path)) && options?.checkDiff) {
    const existingContent = await read(path);
    if (content === existingContent) return;
  }

  await fs.writeFile(path, content, { encoding: "utf-8" });
}

/**
 * Delete a file
 * @param path Path to the file
 * @returns A promise that resolves when the file is deleted
 */
export async function unlink(path: string): Promise<void> {
  await fs.unlink(path);
}

/**
 * Copy a directory recursively
 * @param source Source directory
 * @param destination Destination directory
 * @returns A promise that resolves when the directory is copied
 */
export async function copy(source: string, destination: string): Promise<void> {
  await fsCopy(source, destination);
}

/**
 * Create a directory recursively
 * @param path Path to the directory to create
 * @param options Options for creating the directory
 * @returns A promise that resolves when the directory is created
 * @remarks This function is a wrapper around fs.mkdir with the recursive option set to true.
 */
export async function mkdir(path: string, options?: MkDirOptions): Promise<void> {
  if (options?.checkExists && (await exists(path))) return;
  await fs.mkdir(path, { recursive: true });
}

/**
 * Return the filename without extension
 * @param path Path to the file
 * @returns The filename without extension
 */
export function withoutExtension(path: string): string {
  return path.replace(/\.[^.]+$/, "");
}

/**
 * Return the extension of the file
 * @param path Path to the file
 * @param options Options for getting the extension
 */
export function getExtension(path: string, options?: GetExtensionOptions): string {
  if (options?.multi) {
    return path.split(".").slice(1).join(".");
  } else {
    return path.split(".").slice(-1)[0];
  }
}
