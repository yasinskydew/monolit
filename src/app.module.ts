import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AkaNameModule } from './aka-name/aka-name.module';
import { AkaTitleModule } from './aka-title/aka-title.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CastInfoModule } from './cast-info/cast-info.module';
import { CharNameModule } from './char-name/char-name.module';
import { CompanyNameModule } from './company-name/company-name.module';
import { entities } from './entities';
import { KeywordModule } from './keyword/keyword.module';
import { MovieCompaniesModule } from './movie-companies/movie-companies.module';
import { MovieInfoModule } from './movie-info/movie-info.module';
import { MovieKeywordModule } from './movie-keyword/movie-keyword.module';
import { NameModule } from './name/name.module';
import { PersonInfoModule } from './person-info/person-info.module';
import { TitleModule } from './title/title.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres' as const,
        host: config.get<string>('DB_HOST', 'localhost'),
        port: config.get<number>('DB_PORT', 15432),
        username: config.get<string>('DB_USER', 'db-nest'),
        password: config.get<string>('DB_PASSWORD', 'db-nest'),
        database: config.get<string>('DB_NAME', 'db-nest_db'),
        entities,
        synchronize: false,
        logging: config.get<string>('DB_LOGGING') === 'true',
      }),
    }),
    TitleModule,
    NameModule,
    CastInfoModule,
    MovieInfoModule,
    MovieCompaniesModule,
    MovieKeywordModule,
    CompanyNameModule,
    KeywordModule,
    CharNameModule,
    PersonInfoModule,
    AkaNameModule,
    AkaTitleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
