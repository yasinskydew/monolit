import { Module, OnModuleInit } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { TitleDocumentRepository } from './title-read/title-document.repository';

@Module({
  imports: [MongoModule],
  providers: [TitleDocumentRepository],
  exports: [MongoModule, TitleDocumentRepository],
})
export class CqrsModule implements OnModuleInit {
  constructor(private readonly documents: TitleDocumentRepository) {}

  async onModuleInit(): Promise<void> {
    if (process.env.TITLE_READ_STORE === 'mongo') {
      await this.documents.ensureIndexes();
    }
  }
}
