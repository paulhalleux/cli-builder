/**
 * Options for writing a file.
 */
export type WriteOptions = {
  /**
   * Whether to check if the file content is different before writing it.
   */
  checkDiff?: boolean;
  /**
   * Replace end of line characters with the OS default.
   */
  cleanEndOfLine?: boolean;
};

/**
 * Options for creating a directory.
 */
export type MkDirOptions = {
  /**
   * Whether to check if the directory already exists before creating it.
   */
  checkExists?: boolean;
};

/**
 * Options for retrieving a file extension.
 */
export type GetExtensionOptions = {
  /**
   * Whether to return all extensions or only the last one.
   */
  multi?: boolean;
};
