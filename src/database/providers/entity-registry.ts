import { EntityClass } from '../crud/crud.types';
import { drizzleTableByEntityName } from './drizzle/schema';
import * as Mikro from './mikroorm/entities';
import * as SequelizeModels from './sequelize/models';
import * as TypeOrm from './typeorm/entities';

/** Map DI token class name → provider-specific entity/model class. */
export const mikroOrmEntityByTokenName: Record<string, EntityClass> = {
  Title: Mikro.Title,
  Name: Mikro.Name,
  CastInfo: Mikro.CastInfo,
  MovieInfo: Mikro.MovieInfo,
  MovieInfoIdx: Mikro.MovieInfoIdx,
  MovieCompanies: Mikro.MovieCompanies,
  MovieKeyword: Mikro.MovieKeyword,
  MovieLink: Mikro.MovieLink,
  CompleteCast: Mikro.CompleteCast,
  CompanyName: Mikro.CompanyName,
  Keyword: Mikro.Keyword,
  CharName: Mikro.CharName,
  PersonInfo: Mikro.PersonInfo,
  AkaName: Mikro.AkaName,
  AkaTitle: Mikro.AkaTitle,
  KindType: Mikro.KindType,
  RoleType: Mikro.RoleType,
  CompanyType: Mikro.CompanyType,
  InfoType: Mikro.InfoType,
  LinkType: Mikro.LinkType,
  CompCastType: Mikro.CompCastType,
};

export const sequelizeModelByTokenName: Record<string, EntityClass> = {
  Title: SequelizeModels.Title,
  Name: SequelizeModels.Name,
  CastInfo: SequelizeModels.CastInfo,
  MovieInfo: SequelizeModels.MovieInfo,
  MovieInfoIdx: SequelizeModels.MovieInfoIdx,
  MovieCompanies: SequelizeModels.MovieCompanies,
  MovieKeyword: SequelizeModels.MovieKeyword,
  MovieLink: SequelizeModels.MovieLink,
  CompleteCast: SequelizeModels.CompleteCast,
  CompanyName: SequelizeModels.CompanyName,
  Keyword: SequelizeModels.Keyword,
  CharName: SequelizeModels.CharName,
  PersonInfo: SequelizeModels.PersonInfo,
  AkaName: SequelizeModels.AkaName,
  AkaTitle: SequelizeModels.AkaTitle,
  KindType: SequelizeModels.KindType,
  RoleType: SequelizeModels.RoleType,
  CompanyType: SequelizeModels.CompanyType,
  InfoType: SequelizeModels.InfoType,
  LinkType: SequelizeModels.LinkType,
  CompCastType: SequelizeModels.CompCastType,
};

export const typeOrmEntityByTokenName: Record<string, EntityClass> = {
  Title: TypeOrm.Title,
  Name: TypeOrm.Name,
  CastInfo: TypeOrm.CastInfo,
  MovieInfo: TypeOrm.MovieInfo,
  MovieInfoIdx: TypeOrm.MovieInfoIdx,
  MovieCompanies: TypeOrm.MovieCompanies,
  MovieKeyword: TypeOrm.MovieKeyword,
  MovieLink: TypeOrm.MovieLink,
  CompleteCast: TypeOrm.CompleteCast,
  CompanyName: TypeOrm.CompanyName,
  Keyword: TypeOrm.Keyword,
  CharName: TypeOrm.CharName,
  PersonInfo: TypeOrm.PersonInfo,
  AkaName: TypeOrm.AkaName,
  AkaTitle: TypeOrm.AkaTitle,
  KindType: TypeOrm.KindType,
  RoleType: TypeOrm.RoleType,
  CompanyType: TypeOrm.CompanyType,
  InfoType: TypeOrm.InfoType,
  LinkType: TypeOrm.LinkType,
  CompCastType: TypeOrm.CompCastType,
};

export { drizzleTableByEntityName };

export function drizzleQueryKey(entityName: string): string {
  return entityName.charAt(0).toLowerCase() + entityName.slice(1) + 'Table';
}
