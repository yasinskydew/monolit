import { appendFileSync, mkdirSync } from 'fs';
import { dirname, isAbsolute, join } from 'path';

/**
 * Appends SQL queries from any ORM provider to a project-local log file.
 * Default path: `<cwd>/logs/db-queries.log` (override with DB_QUERY_LOG_PATH).
 */
export class QueryFileLogger {
  private static instance: QueryFileLogger | undefined;
  private ready = false;

  private constructor(private readonly filePath: string) {}

  static getInstance(): QueryFileLogger {
    if (!QueryFileLogger.instance) {
      const configured = process.env.DB_QUERY_LOG_PATH ?? 'logs/db-queries.log';
      const filePath = isAbsolute(configured)
        ? configured
        : join(process.cwd(), configured);
      QueryFileLogger.instance = new QueryFileLogger(filePath);
    }
    return QueryFileLogger.instance;
  }

  get path(): string {
    return this.filePath;
  }

  write(
    provider: string,
    query: string,
    params?: unknown,
    durationMs?: number,
  ): void {
    this.ensureReady();
    const ts = new Date().toISOString();
    const sql = query.replace(/\s+/g, ' ').trim();
    const parts = [`[${ts}]`, `[${provider}]`, sql];
    if (params !== undefined) {
      parts.push(`-- params: ${safeJson(params)}`);
    }
    if (durationMs !== undefined) {
      parts.push(`-- ${durationMs}ms`);
    }
    appendFileSync(this.filePath, `${parts.join(' ')}\n`, 'utf8');
  }

  private ensureReady(): void {
    if (this.ready) {
      return;
    }
    mkdirSync(dirname(this.filePath), { recursive: true });
    this.ready = true;
  }
}

function safeJson(value: unknown): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export function isQueryFileLoggingEnabled(): boolean {
  return process.env.DB_LOGGING === 'true';
}
