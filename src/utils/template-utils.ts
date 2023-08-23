import fs from "fs/promises";
import { Liquid } from "liquidjs";
import prettier from "prettier";
import { WriteTemplateOptions } from "../types";
import { cleanEOL } from "./format";

/**
 * Writes a template to a file. The template can be transformed and prettified.
 * @param template - The template to write.
 * @param data - The data to use when rendering the template.
 * @param options - The options to use when writing the template.
 */
export async function write<TData extends object>(template: string, data?: TData, options?: WriteTemplateOptions) {
  const engine = new Liquid();
  let parsed = await engine.parseAndRender(template, data);

  if (options?.transform) {
    parsed = options.transform(parsed);
  }

  if (options?.prettier) {
    parsed = await prettier.format(parsed, {
      parser: "typescript",
    });
  }

  if (options?.cleanEndOfLine) {
    parsed = cleanEOL(parsed);
  }

  if (options?.output) {
    await fs.writeFile(options?.output, parsed, {
      encoding: "utf-8",
    });
  }
}
