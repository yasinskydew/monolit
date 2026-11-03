/**
 * DI tokens for feature modules — TypeORM entity classes.
 * Other providers map these tokens to their own entity/model sets.
 */
export {
  AkaName,
  AkaTitle,
  CastInfo,
  CharName,
  CompCastType,
  CompanyName,
  CompanyType,
  CompleteCast,
  InfoType,
  Keyword,
  KindType,
  LinkType,
  MovieCompanies,
  MovieInfo,
  MovieInfoIdx,
  MovieKeyword,
  MovieLink,
  Name,
  PersonInfo,
  RoleType,
  Title,
  entities as typeOrmEntities,
} from '../providers/typeorm/entities';
