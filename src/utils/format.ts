/**
 * Remove all EOL characters from a string
 * @param content String to clean
 * @returns Cleaned string
 */
export function cleanEOL(content: string) {
  return content.replace(/\r\n/g, "\n");
}
