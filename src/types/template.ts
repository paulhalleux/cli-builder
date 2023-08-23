/**
 * The options for writing a template using Liquid.
 */
export type WriteTemplateOptions = {
  /**
   * The path to write the template to.
   */
  output?: string;
  /**
   * A function to transform the template before writing it.
   */
  transform?: (content: string) => string;
  /**
   * Whether to prettify the template before writing it.
   */
  prettier?: boolean;
  /**
   * Whether to clean the end of line characters.
   */
  cleanEndOfLine?: boolean;
};
