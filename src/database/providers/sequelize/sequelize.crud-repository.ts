import { NotFoundException } from '@nestjs/common';
import { Model, ModelStatic, Order } from 'sequelize';
import {
  CrudRepository,
  FindAllParams,
  RelationsTree,
} from '../../crud/crud.types';

function toInclude(tree?: RelationsTree): object[] | undefined {
  if (!tree) return undefined;
  return Object.entries(tree).map(([association, value]) => ({
    association,
    required: false,
    ...(value !== true
      ? { include: toInclude(value) }
      : {}),
  }));
}

export class SequelizeCrudRepository<T extends { id: number }>
  implements CrudRepository<T>
{
  constructor(private readonly model: ModelStatic<Model>) {}

  async findAll(params: FindAllParams = {}): Promise<T[]> {
    const {
      skip = 0,
      take = 50,
      relations,
      orderBy = 'id',
      order = 'ASC',
    } = params;

    const attrs = Object.keys(this.model.getAttributes());
    const field = attrs.includes(orderBy) ? orderBy : 'id';

    const rows = await this.model.findAll({
      offset: skip,
      limit: take,
      order: [[field, order]] as Order,
      include: toInclude(relations),
    });
    return rows.map((row) => row.get({ plain: true }) as T);
  }

  async findById(id: number, relations?: RelationsTree): Promise<T | null> {
    const row = await this.model.findByPk(id, {
      include: toInclude(relations),
    });
    return row ? (row.get({ plain: true }) as T) : null;
  }

  async create(data: Partial<T> | object): Promise<T> {
    const payload = { ...(data as Record<string, unknown>) };
    if (payload.id == null) {
      const max = (await this.model.max('id')) as number | null;
      payload.id = Number(max ?? 0) + 1;
    }
    const row = await this.model.create(payload as never);
    return row.get({ plain: true }) as T;
  }

  async update(id: number, data: Partial<T> | object): Promise<T> {
    const row = await this.model.findByPk(id);
    if (!row) {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
    await row.update({ ...(data as object), id } as never);
    return row.get({ plain: true }) as T;
  }

  async remove(id: number): Promise<void> {
    const deleted = await this.model.destroy({ where: { id } as never });
    if (!deleted) {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
  }
}
