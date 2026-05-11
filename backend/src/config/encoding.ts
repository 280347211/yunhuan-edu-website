/**
 * Fix double-encoded UTF-8 strings from MySQL.
 *
 * When UTF-8 data is read through a latin1 connection, each UTF-8 byte
 * gets interpreted as a latin1 character and then re-encoded to UTF-8.
 * This function reverses that process using Node.js Buffer.
 *
 * The function is safe: it only applies the fix if the string appears
 * to be double-encoded (contains typical latin1-misread patterns like
 * Ã, Ã, etc.). If the string is already valid UTF-8 Chinese, it is
 * returned as-is.
 */
export function fixUtf8(str: string | null | undefined): string {
  if (!str) return "";
  try {
    // Detect double-encoding: latin1-misread UTF-8 typically contains
    // characters like Ã (0xC3), Â (0xC2), etc. followed by 0x80-0xBF range
    const hasDoubleEncoding = /[\u00c0-\u00ff][\u0080-\u00bf]/.test(str) ||
      /[\u00c0-\u00ff]{2,}/.test(str);

    if (!hasDoubleEncoding) return str;

    // Use Buffer to reinterpret: treat each char code as a latin1 byte,
    // then decode the resulting bytes as UTF-8
    const buf = Buffer.from(str, "latin1");
    return buf.toString("utf-8");
  } catch {
    return str;
  }
}

/**
 * Fix all string fields in an object recursively
 */
export function fixUtf8Object<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (typeof obj === "string") return fixUtf8(obj) as unknown as T;
  if (Array.isArray(obj)) return obj.map(fixUtf8Object) as unknown as T;
  if (typeof obj === "object" && obj.constructor === Object) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      result[key] = fixUtf8Object(value);
    }
    return result as T;
  }
  return obj;
}
