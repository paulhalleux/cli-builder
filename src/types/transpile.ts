import { Root } from "mdast";

/**
 * The result of transpiling an MDX file
 */
export type MdxTranspileResult<T> = {
  /**
   * The metadata of the MDX file
   */
  metadata: T | null;
  /**
   * The transpiled code
   */
  code: string;
};

export type MdxPlugin = () => (tree: Root) => Root;

/**
 * Options for transpiling an MDX file
 */
export type MdxTranspileOptions = {
  /**
   * Parse the metadata of the MDX file
   */
  parseMetadata?: boolean;
  metadataDelimiter?: string;
  plugins: MdxPlugin[];
};
