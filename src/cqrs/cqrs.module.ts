import { Module, OnModuleInit } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { TitleDocumentRepository } from './title-read/title-document.repository';
import { TitleCdcConsumer } from './title-projection/title-cdc.consumer';
import { TitleIdResolver } from './title-projection/title-id-resolver';
import { TitleProjector } from './title-projection/title.projector';
import { TitleProjectorPersistence } from './title-projection/title-projector.persistence';

@Module({
  imports: [MongoModule],
  providers: [
    TitleDocumentRepository,
    TitleProjectorPersistence,
    TitleProjector,
    TitleIdResolver,
    TitleCdcConsumer,
  ],
  exports: [MongoModule, TitleDocumentRepository, TitleProjector],
})
export class CqrsModule implements OnModuleInit {
  constructor(private readonly documents: TitleDocumentRepository) {}

  async onModuleInit(): Promise<void> {
    if (process.env.TITLE_READ_STORE === 'mongo') {
      await this.documents.ensureIndexes();
    }
  }
}
