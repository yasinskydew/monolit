import { RelationsTree } from '../../database/crud/crud.types';

/** Sections of the Title Mongo document that can be refreshed independently. */
export type TitleProjectionSection =
  | 'akaTitles'
  | 'castInfos'
  | 'movieCompanies'
  | 'movieInfos'
  | 'movieInfoIdxs'
  | 'movieKeywords'
  | 'movieLinks'
  | 'linkedFrom'
  | 'completeCasts';

/**
 * Slim Title graph for Mongo projection.
 * Avoids deep personInfos (main findById cost); keeps cast person shallow.
 */
export const SLIM_TITLE_RELATIONS: RelationsTree = {
  kindType: true,
  episodeOf: true,
  akaTitles: { kindType: true },
  castInfos: {
    person: true,
    character: true,
    roleType: true,
  },
  movieCompanies: {
    company: true,
    companyType: true,
  },
  movieInfos: { infoType: true },
  movieInfoIdxs: { infoType: true },
  movieKeywords: { keywordRef: true },
  movieLinks: {
    linkedMovie: true,
    linkType: true,
  },
  linkedFrom: {
    movie: true,
    linkType: true,
  },
  completeCasts: {
    subjectType: true,
    statusType: true,
  },
};

/** @deprecated alias — projector uses slim graph */
export const FULL_TITLE_RELATIONS = SLIM_TITLE_RELATIONS;

export const SECTION_RELATIONS: Record<TitleProjectionSection, RelationsTree> =
  {
    akaTitles: { akaTitles: { kindType: true } },
    castInfos: {
      castInfos: {
        person: true,
        character: true,
        roleType: true,
      },
    },
    movieCompanies: {
      movieCompanies: {
        company: true,
        companyType: true,
      },
    },
    movieInfos: { movieInfos: { infoType: true } },
    movieInfoIdxs: { movieInfoIdxs: { infoType: true } },
    movieKeywords: { movieKeywords: { keywordRef: true } },
    movieLinks: {
      movieLinks: {
        linkedMovie: true,
        linkType: true,
      },
      linkedFrom: {
        movie: true,
        linkType: true,
      },
    },
    linkedFrom: {
      linkedFrom: {
        movie: true,
        linkType: true,
      },
    },
    completeCasts: {
      completeCasts: {
        subjectType: true,
        statusType: true,
      },
    },
  };

export const TABLE_TO_SECTION: Record<string, TitleProjectionSection> = {
  cast_info: 'castInfos',
  aka_title: 'akaTitles',
  movie_companies: 'movieCompanies',
  movie_info: 'movieInfos',
  movie_info_idx: 'movieInfoIdxs',
  movie_keyword: 'movieKeywords',
  movie_link: 'movieLinks',
  complete_cast: 'completeCasts',
};
