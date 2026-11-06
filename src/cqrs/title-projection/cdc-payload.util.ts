export type DebeziumOp = 'c' | 'u' | 'd' | 'r' | 't';

export type DebeziumPayload = {
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  op?: DebeziumOp;
  source?: { table?: string; schema?: string };
};

export function parseDebeziumMessage(
  raw: string | Buffer | null,
): DebeziumPayload | null {
  if (raw == null) return null;
  try {
    const parsed = JSON.parse(
      typeof raw === 'string' ? raw : raw.toString('utf8'),
    ) as DebeziumPayload & { payload?: DebeziumPayload };
    if (!parsed || typeof parsed !== 'object') return null;
    // JsonConverter may wrap as { schema, payload }
    if (
      parsed.payload &&
      typeof parsed.payload === 'object' &&
      (parsed.payload.op != null ||
        parsed.payload.after != null ||
        parsed.payload.before != null)
    ) {
      return parsed.payload;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function tableFromTopic(
  topic: string,
  prefix: string,
): string | null {
  const expected = `${prefix}.public.`;
  if (!topic.startsWith(expected)) return null;
  return topic.slice(expected.length);
}

export function rowId(
  row: Record<string, unknown> | null | undefined,
): number | undefined {
  if (!row) return undefined;
  const id = row.id;
  if (typeof id === 'number') return id;
  if (typeof id === 'string' && id !== '') return Number(id);
  return undefined;
}

export function rowMovieId(
  row: Record<string, unknown> | null | undefined,
): number | undefined {
  if (!row) return undefined;
  const id = row.movie_id;
  if (typeof id === 'number') return id;
  if (typeof id === 'string' && id !== '') return Number(id);
  return undefined;
}

export function rowPersonId(
  row: Record<string, unknown> | null | undefined,
): number | undefined {
  if (!row) return undefined;
  const id = row.person_id;
  if (typeof id === 'number') return id;
  if (typeof id === 'string' && id !== '') return Number(id);
  return undefined;
}

/** Break circular ORM graphs for Mongo storage. */
export function toPlainDocument(
  entity: object,
): Record<string, unknown> {
  const seen = new WeakSet<object>();
  return JSON.parse(
    JSON.stringify(entity, (_key, value: unknown) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value as object)) return undefined;
        seen.add(value as object);
      }
      return value;
    }),
  ) as Record<string, unknown>;
}
