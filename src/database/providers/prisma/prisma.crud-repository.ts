import { NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  CrudRepository,
  FindAllKeySetParams,
  FindAllParams,
  RelationsTree,
} from '../../crud/crud.types';
import { relationsToInclude } from '../../crud/relations.util';

type Delegate = {
  findMany: (args: object) => Promise<object[]>;
  findUnique: (args: object) => Promise<object | null>;
  create: (args: object) => Promise<object>;
  update: (args: object) => Promise<object>;
  delete: (args: object) => Promise<object>;
  aggregate: (args: object) => Promise<{ _max: { id: number | null } }>;
};

export class PrismaCrudRepository<T extends { id: number }>
  implements CrudRepository<T>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly modelName: string,
  ) {}

  private get delegate(): Delegate {
    const key =
      this.modelName.charAt(0).toLowerCase() + this.modelName.slice(1);
    const delegate = (this.prisma as unknown as Record<string, Delegate>)[key];
    if (!delegate) {
      throw new Error(`Prisma model delegate not found: ${key}`);
    }
    return delegate;
  }

  async findAll(params: FindAllParams = {}): Promise<T[]> {
    const {
      skip = 0,
      take = 50,
      relations,
      orderBy = 'id',
      order = 'ASC',
    } = params;

    const rows = await this.delegate.findMany({
      skip,
      take,
      orderBy: { [orderBy]: order.toLowerCase() },
      include: relationsToInclude(relations),
    });
    return rows as T[];
  }

  async findAllKeySet(params: FindAllKeySetParams = {}): Promise<T[]> {
    const {
      after,
      take = 50,
      relations,
      orderBy = 'id',
      order = 'ASC',
    } = params;

    const rows = await this.delegate.findMany({
      take,
      ...(after == null
        ? {}
        : {
            where: {
              [orderBy]:
                order === 'DESC' ? { lt: after } : { gt: after },
            },
          }),
      orderBy: { [orderBy]: order.toLowerCase() },
      include: relationsToInclude(relations),
    });
    return rows as T[];
  }

  async findById(id: number, relations?: RelationsTree): Promise<T | null> {
    const row = await this.delegate.findUnique({
      where: { id },
      include: relationsToInclude(relations),
    });
    return (row as T | null) ?? null;
  }

  async create(data: Partial<T> | object): Promise<T> {
    const payload = { ...(data as Record<string, unknown>) };
    if (payload.id == null) {
      const agg = await this.delegate.aggregate({ _max: { id: true } });
      payload.id = Number(agg._max.id ?? 0) + 1;
    }
    return (await this.delegate.create({ data: payload })) as T;
  }

  async update(id: number, data: Partial<T> | object): Promise<T> {
    try {
      return (await this.delegate.update({
        where: { id },
        data: { ...(data as object) },
      })) as T;
    } catch {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.delegate.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
  }
}
