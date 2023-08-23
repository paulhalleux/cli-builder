import { MdxTranspileOptions, MdxTranspileResult } from "../types/transpile";
import { FileUtils } from "./";
import { compile } from "@mdx-js/mdx";

/**
 * Transpile the file at the given path to a JSX file
 * @param path Path to the file
 * @param options Options for transpiling the file
 * @returns Path to the transpiled file
 */
export async function mdx<TMetadata = object>(path: string, options?: MdxTranspileOptions): Promise<MdxTranspileResult<TMetadata>> {
  const extension = FileUtils.getExtension(path);

  if (extension !== "mdx") {
    throw new Error(`Invalid extension: ${extension}`);
  }

  const fileContent = await FileUtils.read(path);
  let metadata = null;
  if (options?.parseMetadata) {
    metadata = parseMetadata<TMetadata>(fileContent, options.metadataDelimiter);
  }

  const metadataCleaned = removeMetadata(fileContent, options?.metadataDelimiter);
  const code = (
    await compile(metadataCleaned, {
      // @ts-ignore
      Fragment: "React.Fragment",
      jsx: true,
      jsxs: true,
      remarkPlugins: options?.plugins,
    })
  ).toString();

  return {
    metadata,
    code,
  };
}

/**
 * Parse the metadata of an MDX file
 * @param mdxContent MDX content
 * @param delimiter Delimiter for the metadata
 * @returns Metadata
 */
function parseMetadata<T>(mdxContent: string, delimiter = "---"): T {
  if (!mdxContent.startsWith(delimiter) || mdxContent.split(delimiter).length < 3) throw new Error("Metadata not found");
  const metadata = mdxContent.split(delimiter)[1];
  return metadata
    .split("\n")
    .filter((line) => line.trim().match(/^[a-zA-Z0-9]+:/))
    .reduce((acc, line) => {
      const indexOfKey = line.indexOf(":");
      const key = line.slice(0, indexOfKey);
      const value = line.slice(indexOfKey + 1);
      acc[key.trim() as keyof T] = value.trim() as T[keyof T];
      return acc;
    }, {} as T);
}

/**
 * Remove the metadata from an MDX file
 * @param mdxContent MDX content
 * @param delimiter Delimiter for the metadata
 * @returns MDX content without metadata
 */
function removeMetadata(mdxContent: string, delimiter = "---"): string {
  if (!mdxContent.startsWith(delimiter) || mdxContent.split(delimiter).length < 3) return mdxContent;
  return mdxContent.split(delimiter).slice(2).join(delimiter);
}
