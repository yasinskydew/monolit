import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseCrudService } from '../common/crud/base-crud.service';
import { TitleDocumentRepository } from '../cqrs/title-read/title-document.repository';
import { InjectCrudRepository } from '../database';
import type { CrudRepository, RelationsTree } from '../database';
import { Title } from '../database/entities';

@Injectable()
export class TitleService extends BaseCrudService<Title> {
  private readonly readStore: string;

  constructor(
    @InjectCrudRepository(Title)
    repository: CrudRepository<Title>,
    private readonly documents: TitleDocumentRepository,
    config: ConfigService,
  ) {
    super(repository);
    this.readStore = config.get<string>('TITLE_READ_STORE', 'orm');
  }

  private get useMongo(): boolean {
    return this.readStore === 'mongo';
  }

  override findAll(
    skip = 0,
    take = 50,
    relations?: RelationsTree,
    orderBy = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Title[]> {
    if (this.useMongo) {
      return this.documents.findAll({
        skip,
        take,
        orderBy,
        order,
      }) as unknown as Promise<Title[]>;
    }
    return super.findAll(skip, take, relations, orderBy, order);
  }

  override findAllKeySet(
    after?: number,
    take = 50,
    relations?: RelationsTree,
    orderBy = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
  ): Promise<Title[]> {
    if (this.useMongo) {
      return this.documents.findAllKeySet({
        after,
        take,
        orderBy,
        order,
      }) as unknown as Promise<Title[]>;
    }
    return super.findAllKeySet(after, take, relations, orderBy, order);
  }

  override async findOne(
    id: number,
    relations?: RelationsTree,
  ): Promise<Title> {
    if (this.useMongo) {
      const doc = await this.documents.findById(id);
      if (!doc) {
        throw new NotFoundException(`Entity with id=${id} not found`);
      }
      return doc as unknown as Title;
    }
    return super.findOne(id, relations);
  }
}
