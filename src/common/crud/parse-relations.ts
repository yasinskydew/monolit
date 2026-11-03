import { FindOptionsRelations, ObjectLiteral } from 'typeorm';

/**
 * Parses `a.b.c,x` into nested FindOptionsRelations:
 * { a: { b: { c: true } }, x: true }
 */
export function parseRelations<T extends ObjectLiteral>(
  raw?: string | string[],
): FindOptionsRelations<T> | undefined {
  const parts = (Array.isArray(raw) ? raw : raw?.split(',') ?? [])
    .map((p) => p.trim())
    .filter(Boolean);

  if (!parts.length) {
    return undefined;
  }

  const tree: Record<string, unknown> = {};

  for (const path of parts) {
    const keys = path.split('.').map((k) => k.trim()).filter(Boolean);
    if (!keys.length) continue;

    let node = tree;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const isLeaf = i === keys.length - 1;
      if (isLeaf) {
        if (node[key] == null || node[key] === true) {
          node[key] = true;
        }
      } else {
        if (node[key] === true || node[key] == null) {
          node[key] = {};
        }
        node = node[key] as Record<string, unknown>;
      }
    }
  }

  return tree as FindOptionsRelations<T>;
}
