import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';

export abstract class BaseCrudService<T extends ObjectLiteral & { id: number }> {
  constructor(protected readonly repository: Repository<T>) {}

  async findAll(
    skip = 0,
    take = 50,
    relations?: FindOptionsRelations<T>,
    orderBy = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<T[]> {
    const columns = new Set(
      this.repository.metadata.columns.map((c) => c.propertyName),
    );
    const field = columns.has(orderBy) ? orderBy : 'id';

    return this.repository.find({
      skip,
      take,
      order: { [field]: order } as FindOptionsOrder<T>,
      ...(relations ? { relations } : {}),
    });
  }

  async findOne(
    id: number,
    relations?: FindOptionsRelations<T>,
  ): Promise<T> {
    const entity = await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      ...(relations ? { relations } : {}),
    });
    if (!entity) {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
    return entity;
  }

  async create(dto: DeepPartial<T> | object): Promise<T> {
    const payload = { ...(dto as object) } as DeepPartial<T> & {
      id?: number | null;
    };
    if (payload.id == null) {
      const raw = await this.repository
        .createQueryBuilder('e')
        .select('MAX(e.id)', 'max')
        .getRawOne<{ max: string | null }>();
      payload.id = Number(raw?.max ?? 0) + 1;
    }
    const entity = this.repository.create(payload as DeepPartial<T>);
    return this.repository.save(entity);
  }

  async update(id: number, dto: DeepPartial<T> | object): Promise<T> {
    const entity = await this.findOne(id);
    Object.assign(entity, dto, { id });
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }
}
