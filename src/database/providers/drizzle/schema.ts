import { relations } from 'drizzle-orm';
import {
  integer,
  pgTable,
  varchar,
} from 'drizzle-orm/pg-core';

export const akaNameTable = pgTable('aka_name', {
  id: integer('id').primaryKey(),
  person_id: integer('person_id').notNull(),
  name: varchar('name'),
  imdb_index: varchar('imdb_index'),
  name_pcode_cf: varchar('name_pcode_cf'),
  name_pcode_nf: varchar('name_pcode_nf'),
  surname_pcode: varchar('surname_pcode'),
  md5sum: varchar('md5sum'),
});

export const akaTitleTable = pgTable('aka_title', {
  id: integer('id').primaryKey(),
  movie_id: integer('movie_id').notNull(),
  title: varchar('title'),
  imdb_index: varchar('imdb_index'),
  kind_id: integer('kind_id').notNull(),
  production_year: integer('production_year'),
  phonetic_code: varchar('phonetic_code'),
  episode_of_id: integer('episode_of_id'),
  season_nr: integer('season_nr'),
  episode_nr: integer('episode_nr'),
  note: varchar('note'),
  md5sum: varchar('md5sum'),
});

export const castInfoTable = pgTable('cast_info', {
  id: integer('id').primaryKey(),
  person_id: integer('person_id').notNull(),
  movie_id: integer('movie_id').notNull(),
  person_role_id: integer('person_role_id'),
  note: varchar('note'),
  nr_order: integer('nr_order'),
  role_id: integer('role_id').notNull(),
});

export const charNameTable = pgTable('char_name', {
  id: integer('id').primaryKey(),
  name: varchar('name').notNull(),
  imdb_index: varchar('imdb_index'),
  imdb_id: integer('imdb_id'),
  name_pcode_nf: varchar('name_pcode_nf'),
  surname_pcode: varchar('surname_pcode'),
  md5sum: varchar('md5sum'),
});

export const compCastTypeTable = pgTable('comp_cast_type', {
  id: integer('id').primaryKey(),
  kind: varchar('kind').notNull(),
});

export const companyNameTable = pgTable('company_name', {
  id: integer('id').primaryKey(),
  name: varchar('name').notNull(),
  country_code: varchar('country_code'),
  imdb_id: integer('imdb_id'),
  name_pcode_nf: varchar('name_pcode_nf'),
  name_pcode_sf: varchar('name_pcode_sf'),
  md5sum: varchar('md5sum'),
});

export const companyTypeTable = pgTable('company_type', {
  id: integer('id').primaryKey(),
  kind: varchar('kind'),
});

export const completeCastTable = pgTable('complete_cast', {
  id: integer('id').primaryKey(),
  movie_id: integer('movie_id'),
  subject_id: integer('subject_id').notNull(),
  status_id: integer('status_id').notNull(),
});

export const infoTypeTable = pgTable('info_type', {
  id: integer('id').primaryKey(),
  info: varchar('info').notNull(),
});

export const keywordTable = pgTable('keyword', {
  id: integer('id').primaryKey(),
  keyword: varchar('keyword').notNull(),
  phonetic_code: varchar('phonetic_code'),
});

export const kindTypeTable = pgTable('kind_type', {
  id: integer('id').primaryKey(),
  kind: varchar('kind'),
});

export const linkTypeTable = pgTable('link_type', {
  id: integer('id').primaryKey(),
  link: varchar('link').notNull(),
});

export const movieCompaniesTable = pgTable('movie_companies', {
  id: integer('id').primaryKey(),
  movie_id: integer('movie_id').notNull(),
  company_id: integer('company_id').notNull(),
  company_type_id: integer('company_type_id').notNull(),
  note: varchar('note'),
});

export const movieInfoIdxTable = pgTable('movie_info_idx', {
  id: integer('id').primaryKey(),
  movie_id: integer('movie_id').notNull(),
  info_type_id: integer('info_type_id').notNull(),
  info: varchar('info').notNull(),
  note: varchar('note'),
});

export const movieInfoTable = pgTable('movie_info', {
  id: integer('id').primaryKey(),
  movie_id: integer('movie_id').notNull(),
  info_type_id: integer('info_type_id').notNull(),
  info: varchar('info').notNull(),
  note: varchar('note'),
});

export const movieKeywordTable = pgTable('movie_keyword', {
  id: integer('id').primaryKey(),
  movie_id: integer('movie_id').notNull(),
  keyword_id: integer('keyword_id').notNull(),
});

export const movieLinkTable = pgTable('movie_link', {
  id: integer('id').primaryKey(),
  movie_id: integer('movie_id').notNull(),
  linked_movie_id: integer('linked_movie_id').notNull(),
  link_type_id: integer('link_type_id').notNull(),
});

export const nameTable = pgTable('name', {
  id: integer('id').primaryKey(),
  name: varchar('name').notNull(),
  imdb_index: varchar('imdb_index'),
  imdb_id: integer('imdb_id'),
  gender: varchar('gender'),
  name_pcode_cf: varchar('name_pcode_cf'),
  name_pcode_nf: varchar('name_pcode_nf'),
  surname_pcode: varchar('surname_pcode'),
  md5sum: varchar('md5sum'),
});

export const personInfoTable = pgTable('person_info', {
  id: integer('id').primaryKey(),
  person_id: integer('person_id').notNull(),
  info_type_id: integer('info_type_id').notNull(),
  info: varchar('info').notNull(),
  note: varchar('note'),
});

export const roleTypeTable = pgTable('role_type', {
  id: integer('id').primaryKey(),
  role: varchar('role').notNull(),
});

export const titleTable = pgTable('title', {
  id: integer('id').primaryKey(),
  title: varchar('title').notNull(),
  imdb_index: varchar('imdb_index'),
  kind_id: integer('kind_id').notNull(),
  production_year: integer('production_year'),
  imdb_id: integer('imdb_id'),
  phonetic_code: varchar('phonetic_code'),
  episode_of_id: integer('episode_of_id'),
  season_nr: integer('season_nr'),
  episode_nr: integer('episode_nr'),
  series_years: varchar('series_years'),
  md5sum: varchar('md5sum'),
});

export const akaNameTableRelations = relations(akaNameTable, ({ one, many }) => ({
  person: one(nameTable, { fields: [akaNameTable.person_id], references: [nameTable.id] }),
}));

export const akaTitleTableRelations = relations(akaTitleTable, ({ one, many }) => ({
  movie: one(titleTable, { fields: [akaTitleTable.movie_id], references: [titleTable.id] }),
  kindType: one(kindTypeTable, { fields: [akaTitleTable.kind_id], references: [kindTypeTable.id] }),
}));

export const castInfoTableRelations = relations(castInfoTable, ({ one, many }) => ({
  person: one(nameTable, { fields: [castInfoTable.person_id], references: [nameTable.id] }),
  movie: one(titleTable, { fields: [castInfoTable.movie_id], references: [titleTable.id] }),
  character: one(charNameTable, { fields: [castInfoTable.person_role_id], references: [charNameTable.id] }),
  roleType: one(roleTypeTable, { fields: [castInfoTable.role_id], references: [roleTypeTable.id] }),
}));

export const charNameTableRelations = relations(charNameTable, ({ one, many }) => ({
  castInfos: many(castInfoTable),
}));

export const compCastTypeTableRelations = relations(compCastTypeTable, ({ one, many }) => ({
  subjectCasts: many(completeCastTable),
  statusCasts: many(completeCastTable),
}));

export const companyNameTableRelations = relations(companyNameTable, ({ one, many }) => ({
  movieCompanies: many(movieCompaniesTable),
}));

export const companyTypeTableRelations = relations(companyTypeTable, ({ one, many }) => ({
  movieCompanies: many(movieCompaniesTable),
}));

export const completeCastTableRelations = relations(completeCastTable, ({ one, many }) => ({
  movie: one(titleTable, { fields: [completeCastTable.movie_id], references: [titleTable.id] }),
  subjectType: one(compCastTypeTable, { fields: [completeCastTable.subject_id], references: [compCastTypeTable.id] }),
  statusType: one(compCastTypeTable, { fields: [completeCastTable.status_id], references: [compCastTypeTable.id] }),
}));

export const infoTypeTableRelations = relations(infoTypeTable, ({ one, many }) => ({
  movieInfos: many(movieInfoTable),
  movieInfoIdxs: many(movieInfoIdxTable),
  personInfos: many(personInfoTable),
}));

export const keywordTableRelations = relations(keywordTable, ({ one, many }) => ({
  movieKeywords: many(movieKeywordTable),
}));

export const kindTypeTableRelations = relations(kindTypeTable, ({ one, many }) => ({
  titles: many(titleTable),
  akaTitles: many(akaTitleTable),
}));

export const linkTypeTableRelations = relations(linkTypeTable, ({ one, many }) => ({
  movieLinks: many(movieLinkTable),
}));

export const movieCompaniesTableRelations = relations(movieCompaniesTable, ({ one, many }) => ({
  movie: one(titleTable, { fields: [movieCompaniesTable.movie_id], references: [titleTable.id] }),
  company: one(companyNameTable, { fields: [movieCompaniesTable.company_id], references: [companyNameTable.id] }),
  companyType: one(companyTypeTable, { fields: [movieCompaniesTable.company_type_id], references: [companyTypeTable.id] }),
}));

export const movieInfoIdxTableRelations = relations(movieInfoIdxTable, ({ one, many }) => ({
  movie: one(titleTable, { fields: [movieInfoIdxTable.movie_id], references: [titleTable.id] }),
  infoType: one(infoTypeTable, { fields: [movieInfoIdxTable.info_type_id], references: [infoTypeTable.id] }),
}));

export const movieInfoTableRelations = relations(movieInfoTable, ({ one, many }) => ({
  movie: one(titleTable, { fields: [movieInfoTable.movie_id], references: [titleTable.id] }),
  infoType: one(infoTypeTable, { fields: [movieInfoTable.info_type_id], references: [infoTypeTable.id] }),
}));

export const movieKeywordTableRelations = relations(movieKeywordTable, ({ one, many }) => ({
  movie: one(titleTable, { fields: [movieKeywordTable.movie_id], references: [titleTable.id] }),
  keywordRef: one(keywordTable, { fields: [movieKeywordTable.keyword_id], references: [keywordTable.id] }),
}));

export const movieLinkTableRelations = relations(movieLinkTable, ({ one, many }) => ({
  movie: one(titleTable, { fields: [movieLinkTable.movie_id], references: [titleTable.id] }),
  linkedMovie: one(titleTable, { fields: [movieLinkTable.linked_movie_id], references: [titleTable.id] }),
  linkType: one(linkTypeTable, { fields: [movieLinkTable.link_type_id], references: [linkTypeTable.id] }),
}));

export const nameTableRelations = relations(nameTable, ({ one, many }) => ({
  akaNames: many(akaNameTable),
  castInfos: many(castInfoTable),
  personInfos: many(personInfoTable),
}));

export const personInfoTableRelations = relations(personInfoTable, ({ one, many }) => ({
  person: one(nameTable, { fields: [personInfoTable.person_id], references: [nameTable.id] }),
  infoType: one(infoTypeTable, { fields: [personInfoTable.info_type_id], references: [infoTypeTable.id] }),
}));

export const roleTypeTableRelations = relations(roleTypeTable, ({ one, many }) => ({
  castInfos: many(castInfoTable),
}));

export const titleTableRelations = relations(titleTable, ({ one, many }) => ({
  kindType: one(kindTypeTable, { fields: [titleTable.kind_id], references: [kindTypeTable.id] }),
  episodeOf: one(titleTable, { fields: [titleTable.episode_of_id], references: [titleTable.id] }),
  episodes: many(titleTable),
  akaTitles: many(akaTitleTable),
  castInfos: many(castInfoTable),
  movieCompanies: many(movieCompaniesTable),
  movieInfos: many(movieInfoTable),
  movieInfoIdxs: many(movieInfoIdxTable),
  movieKeywords: many(movieKeywordTable),
  movieLinks: many(movieLinkTable),
  linkedFrom: many(movieLinkTable),
  completeCasts: many(completeCastTable),
}));

export const schema = {
  akaNameTable,
  akaNameTableRelations,
  akaTitleTable,
  akaTitleTableRelations,
  castInfoTable,
  castInfoTableRelations,
  charNameTable,
  charNameTableRelations,
  compCastTypeTable,
  compCastTypeTableRelations,
  companyNameTable,
  companyNameTableRelations,
  companyTypeTable,
  companyTypeTableRelations,
  completeCastTable,
  completeCastTableRelations,
  infoTypeTable,
  infoTypeTableRelations,
  keywordTable,
  keywordTableRelations,
  kindTypeTable,
  kindTypeTableRelations,
  linkTypeTable,
  linkTypeTableRelations,
  movieCompaniesTable,
  movieCompaniesTableRelations,
  movieInfoIdxTable,
  movieInfoIdxTableRelations,
  movieInfoTable,
  movieInfoTableRelations,
  movieKeywordTable,
  movieKeywordTableRelations,
  movieLinkTable,
  movieLinkTableRelations,
  nameTable,
  nameTableRelations,
  personInfoTable,
  personInfoTableRelations,
  roleTypeTable,
  roleTypeTableRelations,
  titleTable,
  titleTableRelations,
};

export const drizzleTableByEntityName: Record<string, any> = {
  AkaName: akaNameTable,
  AkaTitle: akaTitleTable,
  CastInfo: castInfoTable,
  CharName: charNameTable,
  CompCastType: compCastTypeTable,
  CompanyName: companyNameTable,
  CompanyType: companyTypeTable,
  CompleteCast: completeCastTable,
  InfoType: infoTypeTable,
  Keyword: keywordTable,
  KindType: kindTypeTable,
  LinkType: linkTypeTable,
  MovieCompanies: movieCompaniesTable,
  MovieInfoIdx: movieInfoIdxTable,
  MovieInfo: movieInfoTable,
  MovieKeyword: movieKeywordTable,
  MovieLink: movieLinkTable,
  Name: nameTable,
  PersonInfo: personInfoTable,
  RoleType: roleTypeTable,
  Title: titleTable,
};
