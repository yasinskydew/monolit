import { EntityName, wrap } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { NotFoundException } from '@nestjs/common';
import {
  CrudRepository,
  FindAllKeySetParams,
  FindAllParams,
  RelationsTree,
} from '../../crud/crud.types';
import { relationsToPaths } from '../../crud/relations.util';

export class MikroOrmCrudRepository<T extends { id: number }>
  implements CrudRepository<T>
{
  constructor(
    private readonly em: EntityManager,
    private readonly entityName: EntityName<object>,
  ) {}

  private populate(relations?: RelationsTree): string[] | undefined {
    const paths = relationsToPaths(relations);
    return paths.length ? paths : undefined;
  }

  private toPlain(entity: object): T {
    return wrap(entity).toObject() as T;
  }

  private resolveOrderField(orderBy: string): string {
    const meta = this.em.getMetadata().get(this.entityName);
    return meta.properties[orderBy] ? orderBy : 'id';
  }

  async findAll(params: FindAllParams = {}): Promise<T[]> {
    const {
      skip = 0,
      take = 50,
      relations,
      orderBy = 'id',
      order = 'ASC',
    } = params;

    const field = this.resolveOrderField(orderBy);

    const rows = await this.em.find(
      this.entityName,
      {},
      {
        limit: take,
        offset: skip,
        orderBy: { [field]: order.toLowerCase() },
        populate: this.populate(relations) as never,
      },
    );
    return rows.map((row) => this.toPlain(row));
  }

  async findAllKeySet(params: FindAllKeySetParams = {}): Promise<T[]> {
    const {
      after,
      take = 50,
      relations,
      orderBy = 'id',
      order = 'ASC',
    } = params;

    const field = this.resolveOrderField(orderBy);
    const where =
      after == null
        ? {}
        : {
            [field]:
              order === 'DESC' ? { $lt: after } : { $gt: after },
          };

    const rows = await this.em.find(this.entityName, where as never, {
      limit: take,
      orderBy: { [field]: order.toLowerCase() },
      populate: this.populate(relations) as never,
    });
    return rows.map((row) => this.toPlain(row));
  }

  async findById(id: number, relations?: RelationsTree): Promise<T | null> {
    const row = await this.em.findOne(
      this.entityName,
      { id } as never,
      { populate: this.populate(relations) as never },
    );
    return row ? this.toPlain(row) : null;
  }

  async create(data: Partial<T> | object): Promise<T> {
    const payload = { ...(data as Record<string, unknown>) };
    if (payload.id == null) {
      const result = await this.em
        .getConnection()
        .execute<{ max: string | number | null }[]>(
          `select max(id) as max from "${this.tableName()}"`,
        );
      payload.id = Number(result[0]?.max ?? 0) + 1;
    }
    const entity = this.em.create(this.entityName, payload as never);
    this.em.persist(entity);
    await this.em.flush();
    return this.toPlain(entity);
  }

  async update(id: number, data: Partial<T> | object): Promise<T> {
    const entity = await this.em.findOne(this.entityName, { id } as never);
    if (!entity) {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
    this.em.assign(entity, { ...(data as object), id } as never);
    await this.em.flush();
    return this.toPlain(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.em.findOne(this.entityName, { id } as never);
    if (!entity) {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
    this.em.remove(entity);
    await this.em.flush();
  }

  private tableName(): string {
    return this.em.getMetadata().get(this.entityName).tableName;
  }
}
