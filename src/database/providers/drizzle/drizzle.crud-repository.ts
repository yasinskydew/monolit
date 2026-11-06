import { NotFoundException } from '@nestjs/common';
import { asc, desc, eq, getTableColumns, gt, lt, max } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import {
  CrudRepository,
  FindAllKeySetParams,
  FindAllParams,
  RelationsTree,
} from '../../crud/crud.types';
import { relationsToDrizzleWith } from '../../crud/relations.util';

/* eslint-disable @typescript-eslint/no-explicit-any */
type DrizzleDb = any;

export class DrizzleCrudRepository<T extends { id: number }>
  implements CrudRepository<T>
{
  constructor(
    private readonly db: DrizzleDb,
    private readonly table: PgTable,
    private readonly queryKey: string,
  ) {}

  private cols() {
    return getTableColumns(this.table) as Record<string, any>;
  }

  async findAll(params: FindAllParams = {}): Promise<T[]> {
    const {
      skip = 0,
      take = 50,
      relations,
      orderBy = 'id',
      order = 'ASC',
    } = params;
    const cols = this.cols();
    const col = cols[orderBy] ?? cols.id;
    const withClause = relationsToDrizzleWith(relations);

    if (withClause) {
      return (await this.db.query[this.queryKey].findMany({
        limit: take,
        offset: skip,
        with: withClause,
        orderBy: (fields: Record<string, any>, ops: { asc: Function; desc: Function }) =>
          order === 'DESC'
            ? ops.desc(fields[orderBy] ?? fields.id)
            : ops.asc(fields[orderBy] ?? fields.id),
      })) as T[];
    }

    return (await this.db
      .select()
      .from(this.table)
      .orderBy(order === 'DESC' ? desc(col) : asc(col))
      .limit(take)
      .offset(skip)) as T[];
  }

  async findAllKeySet(params: FindAllKeySetParams = {}): Promise<T[]> {
    const {
      after,
      take = 50,
      relations,
      orderBy = 'id',
      order = 'ASC',
    } = params;
    const cols = this.cols();
    const col = cols[orderBy] ?? cols.id;
    const withClause = relationsToDrizzleWith(relations);
    const cursor =
      after == null
        ? undefined
        : order === 'DESC'
          ? lt(col, after)
          : gt(col, after);

    if (withClause) {
      return (await this.db.query[this.queryKey].findMany({
        limit: take,
        ...(cursor
          ? {
              where: (
                fields: Record<string, any>,
                ops: { gt: Function; lt: Function },
              ) => {
                const field = fields[orderBy] ?? fields.id;
                return order === 'DESC'
                  ? ops.lt(field, after)
                  : ops.gt(field, after);
              },
            }
          : {}),
        with: withClause,
        orderBy: (fields: Record<string, any>, ops: { asc: Function; desc: Function }) =>
          order === 'DESC'
            ? ops.desc(fields[orderBy] ?? fields.id)
            : ops.asc(fields[orderBy] ?? fields.id),
      })) as T[];
    }

    const query = this.db.select().from(this.table);
    const filtered = cursor ? query.where(cursor) : query;
    return (await filtered
      .orderBy(order === 'DESC' ? desc(col) : asc(col))
      .limit(take)) as T[];
  }

  async findById(id: number, relations?: RelationsTree): Promise<T | null> {
    const withClause = relationsToDrizzleWith(relations);
    const row = await this.db.query[this.queryKey].findFirst({
      where: eq(this.cols().id, id),
      ...(withClause ? { with: withClause } : {}),
    });
    return (row as T | null) ?? null;
  }

  async create(data: Partial<T> | object): Promise<T> {
    const payload = { ...(data as Record<string, unknown>) };
    if (payload.id == null) {
      const [row] = await this.db
        .select({ value: max(this.cols().id) })
        .from(this.table);
      payload.id = Number(row?.value ?? 0) + 1;
    }
    const [created] = await this.db
      .insert(this.table)
      .values(payload)
      .returning();
    return created as T;
  }

  async update(id: number, data: Partial<T> | object): Promise<T> {
    const [updated] = await this.db
      .update(this.table)
      .set(data)
      .where(eq(this.cols().id, id))
      .returning();
    if (!updated) {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
    return updated as T;
  }

  async remove(id: number): Promise<void> {
    const [deleted] = await this.db
      .delete(this.table)
      .where(eq(this.cols().id, id))
      .returning();
    if (!deleted) {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
  }
}
