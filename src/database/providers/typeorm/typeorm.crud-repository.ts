import { NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsRelations,
  FindOptionsWhere,
  LessThan,
  MoreThan,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import {
  CrudRepository,
  FindAllKeySetParams,
  FindAllParams,
  RelationsTree,
} from '../../crud/crud.types';

export class TypeOrmCrudRepository<T extends ObjectLiteral & { id: number }>
  implements CrudRepository<T>
{
  constructor(private readonly repository: Repository<T>) {}

  private resolveOrderField(orderBy: string): string {
    const columns = new Set(
      this.repository.metadata.columns.map((c) => c.propertyName),
    );
    return columns.has(orderBy) ? orderBy : 'id';
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

    return this.repository.find({
      skip,
      take,
      order: { [field]: order } as FindOptionsOrder<T>,
      ...(relations
        ? {
            relations: relations as FindOptionsRelations<T>,
            relationLoadStrategy: 'query',
          }
        : {}),
    });
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
        ? undefined
        : ({
            [field]: order === 'DESC' ? LessThan(after) : MoreThan(after),
          } as FindOptionsWhere<T>);

    return this.repository.find({
      ...(where ? { where } : {}),
      take,
      order: { [field]: order } as FindOptionsOrder<T>,
      ...(relations
        ? {
            relations: relations as FindOptionsRelations<T>,
          }
        : {}),
    });
  }

  async findById(id: number, relations?: RelationsTree): Promise<T | null> {
    return this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      ...(relations
        ? {
            relations: relations as FindOptionsRelations<T>,
            relationLoadStrategy: 'query',
          }
        : {}),
    });
  }

  async create(data: Partial<T> | object): Promise<T> {
    const payload = { ...(data as object) } as DeepPartial<T> & {
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

  async update(id: number, data: Partial<T> | object): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
    Object.assign(entity, data, { id });
    return this.repository.save(entity);
  }

  async remove(id: number): Promise<void> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
    await this.repository.remove(entity);
  }
}
