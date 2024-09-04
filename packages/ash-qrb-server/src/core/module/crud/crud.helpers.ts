import type { AnyPgTable } from 'drizzle-orm/pg-core';

export const findUniqueParam = (schema: AnyPgTable): string | null => {
  for (const key in schema) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    if ((schema as any)[key].isUnique) return key
  }

  return null
}