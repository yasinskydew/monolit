import { AkaName } from './aka-name.entity';
import { AkaTitle } from './aka-title.entity';
import { CastInfo } from './cast-info.entity';
import { CharName } from './char-name.entity';
import { CompCastType } from './comp-cast-type.entity';
import { CompanyName } from './company-name.entity';
import { CompanyType } from './company-type.entity';
import { CompleteCast } from './complete-cast.entity';
import { InfoType } from './info-type.entity';
import { Keyword } from './keyword.entity';
import { KindType } from './kind-type.entity';
import { LinkType } from './link-type.entity';
import { MovieCompanies } from './movie-companies.entity';
import { MovieInfo } from './movie-info.entity';
import { MovieInfoIdx } from './movie-info-idx.entity';
import { MovieKeyword } from './movie-keyword.entity';
import { MovieLink } from './movie-link.entity';
import { Name } from './name.entity';
import { PersonInfo } from './person-info.entity';
import { RoleType } from './role-type.entity';
import { Title } from './title.entity';

export const entities = [
  Title,
  Name,
  CastInfo,
  MovieInfo,
  MovieInfoIdx,
  MovieCompanies,
  MovieKeyword,
  MovieLink,
  CompleteCast,
  CompanyName,
  Keyword,
  CharName,
  PersonInfo,
  AkaName,
  AkaTitle,
  KindType,
  RoleType,
  CompanyType,
  InfoType,
  LinkType,
  CompCastType,
];

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
};
