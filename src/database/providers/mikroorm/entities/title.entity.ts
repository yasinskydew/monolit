import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, ManyToOne, OneToMany } from '@mikro-orm/decorators/legacy';
import { AkaTitle } from './aka-title.entity';
import { CastInfo } from './cast-info.entity';
import { CompleteCast } from './complete-cast.entity';
import { KindType } from './kind-type.entity';
import { MovieCompanies } from './movie-companies.entity';
import { MovieInfo } from './movie-info.entity';
import { MovieInfoIdx } from './movie-info-idx.entity';
import { MovieKeyword } from './movie-keyword.entity';
import { MovieLink } from './movie-link.entity';

@Entity({ tableName: 'title' })
export class Title {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  title!: string;

  @Property({ nullable: true })
  imdb_index?: string | null;


  @Property({ nullable: true })
  production_year?: number | null;

  @Property({ nullable: true })
  imdb_id?: number | null;

  @Property({ nullable: true })
  phonetic_code?: string | null;


  @Property({ nullable: true })
  season_nr?: number | null;

  @Property({ nullable: true })
  episode_nr?: number | null;

  @Property({ nullable: true })
  series_years?: string | null;

  @Property({ nullable: true })
  md5sum?: string | null;

  @ManyToOne({ entity: () => KindType, fieldName: 'kind_id' })
  kindType!: KindType;

  @ManyToOne({ entity: () => Title, fieldName: 'episode_of_id', nullable: true })
  episodeOf?: Title | null;

  @OneToMany(() => Title, (e) => e.episodeOf)
  episodes = new Collection<Title>(this);

  @OneToMany(() => AkaTitle, (e) => e.movie)
  akaTitles = new Collection<AkaTitle>(this);

  @OneToMany(() => CastInfo, (e) => e.movie)
  castInfos = new Collection<CastInfo>(this);

  @OneToMany(() => MovieCompanies, (e) => e.movie)
  movieCompanies = new Collection<MovieCompanies>(this);

  @OneToMany(() => MovieInfo, (e) => e.movie)
  movieInfos = new Collection<MovieInfo>(this);

  @OneToMany(() => MovieInfoIdx, (e) => e.movie)
  movieInfoIdxs = new Collection<MovieInfoIdx>(this);

  @OneToMany(() => MovieKeyword, (e) => e.movie)
  movieKeywords = new Collection<MovieKeyword>(this);

  @OneToMany(() => MovieLink, (e) => e.movie)
  movieLinks = new Collection<MovieLink>(this);

  @OneToMany(() => MovieLink, (e) => e.linkedMovie)
  linkedFrom = new Collection<MovieLink>(this);

  @OneToMany(() => CompleteCast, (e) => e.movie)
  completeCasts = new Collection<CompleteCast>(this);

}
