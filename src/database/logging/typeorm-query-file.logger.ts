import { Logger as TypeOrmLogger, QueryRunner } from 'typeorm';
import { QueryFileLogger } from './query-file.logger';

export class TypeOrmQueryFileLogger implements TypeOrmLogger {
  private readonly file = QueryFileLogger.getInstance();

  logQuery(query: string, parameters?: unknown[], _queryRunner?: QueryRunner): void {
    this.file.write('typeorm', query, parameters);
  }

  logQueryError(
    error: string | Error,
    query: string,
    parameters?: unknown[],
    _queryRunner?: QueryRunner,
  ): void {
    const message = error instanceof Error ? error.message : error;
    this.file.write('typeorm', `ERROR ${message} | ${query}`, parameters);
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: unknown[],
    _queryRunner?: QueryRunner,
  ): void {
    this.file.write('typeorm', query, parameters, time);
  }

  logSchemaBuild(message: string, _queryRunner?: QueryRunner): void {
    this.file.write('typeorm', `schema: ${message}`);
  }

  logMigration(message: string, _queryRunner?: QueryRunner): void {
    this.file.write('typeorm', `migration: ${message}`);
  }

  log(
    level: 'log' | 'info' | 'warn',
    message: unknown,
    _queryRunner?: QueryRunner,
  ): void {
    this.file.write('typeorm', `${level}: ${String(message)}`);
  }
}
