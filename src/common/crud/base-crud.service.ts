import { NotFoundException } from '@nestjs/common';
import {
  CrudRepository,
  FindAllParams,
  RelationsTree,
} from '../../database/crud/crud.types';

export abstract class BaseCrudService<T extends { id: number }> {
  constructor(protected readonly repository: CrudRepository<T>) {}

  findAll(
    skip = 0,
    take = 50,
    relations?: RelationsTree,
    orderBy = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<T[]> {
    const params: FindAllParams = { skip, take, relations, orderBy, order };
    return this.repository.findAll(params);
  }

  async findOne(id: number, relations?: RelationsTree): Promise<T> {
    const entity = await this.repository.findById(id, relations);
    if (!entity) {
      throw new NotFoundException(`Entity with id=${id} not found`);
    }
    return entity;
  }

  create(dto: Partial<T> | object): Promise<T> {
    return this.repository.create(dto);
  }

  update(id: number, dto: Partial<T> | object): Promise<T> {
    return this.repository.update(id, dto);
  }

  remove(id: number): Promise<void> {
    return this.repository.remove(id);
  }
}
