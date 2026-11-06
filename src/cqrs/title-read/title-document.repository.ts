import { Inject, Injectable } from '@nestjs/common';
import { Collection, Db, Document } from 'mongodb';
import { MONGO_DB } from '../mongo/mongo.tokens';

export type TitleDocument = Document & { id: number; _id: number };

@Injectable()
export class TitleDocumentRepository {
  private readonly collection: Collection<TitleDocument>;

  constructor(@Inject(MONGO_DB) db: Db) {
    this.collection = db.collection<TitleDocument>('titles');
  }

  async ensureIndexes(): Promise<void> {
    await this.collection.createIndex({ id: 1 }, { unique: true });
  }

  async findById(id: number): Promise<TitleDocument | null> {
    return this.collection.findOne({ _id: id });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    orderBy?: string;
    order?: 'ASC' | 'DESC';
  }): Promise<TitleDocument[]> {
    const {
      skip = 0,
      take = 50,
      orderBy = 'id',
      order = 'ASC',
    } = params;
    const field = orderBy || 'id';
    const direction = order === 'DESC' ? -1 : 1;
    return this.collection
      .find({})
      .sort({ [field]: direction })
      .skip(skip)
      .limit(take)
      .toArray();
  }

  async findAllKeySet(params: {
    after?: number;
    take?: number;
    orderBy?: string;
    order?: 'ASC' | 'DESC';
  }): Promise<TitleDocument[]> {
    const {
      after,
      take = 50,
      orderBy = 'id',
      order = 'ASC',
    } = params;
    const field = orderBy || 'id';
    const direction = order === 'DESC' ? -1 : 1;
    const filter =
      after == null
        ? {}
        : {
            [field]:
              order === 'DESC' ? { $lt: after } : { $gt: after },
          };
    return this.collection
      .find(filter)
      .sort({ [field]: direction })
      .limit(take)
      .toArray();
  }

  async upsert(doc: Record<string, unknown> & { id: number }): Promise<void> {
    const { id, ...rest } = doc;
    await this.collection.replaceOne(
      { _id: id },
      { _id: id, id, ...rest } as TitleDocument,
      { upsert: true },
    );
  }

  async patchFields(
    id: number,
    fields: Record<string, unknown>,
  ): Promise<void> {
    await this.collection.updateOne(
      { _id: id },
      { $set: fields },
    );
  }

  async delete(id: number): Promise<void> {
    await this.collection.deleteOne({ _id: id });
  }
}
