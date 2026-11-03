import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { AkaTitle } from './aka-title.entity';
import { CastInfo } from './cast-info.entity';
import { CompleteCast } from './complete-cast.entity';
import { KindType } from './kind-type.entity';
import { MovieCompanies } from './movie-companies.entity';
import { MovieInfo } from './movie-info.entity';
import { MovieInfoIdx } from './movie-info-idx.entity';
import { MovieKeyword } from './movie-keyword.entity';
import { MovieLink } from './movie-link.entity';

@Entity({ name: 'title' })
export class Title {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  imdb_index: string | null;

  @Column({ type: 'int' })
  kind_id: number;

  @Column({ type: 'int', nullable: true })
  production_year: number | null;

  @Column({ type: 'int', nullable: true })
  imdb_id: number | null;

  @Column({ type: 'varchar', length: 5, nullable: true })
  phonetic_code: string | null;

  @Column({ type: 'int', nullable: true })
  episode_of_id: number | null;

  @Column({ type: 'int', nullable: true })
  season_nr: number | null;

  @Column({ type: 'int', nullable: true })
  episode_nr: number | null;

  @Column({ type: 'varchar', length: 49, nullable: true })
  series_years: string | null;

  @Column({ type: 'varchar', length: 32, nullable: true })
  md5sum: string | null;

  @ManyToOne(() => KindType, (kind) => kind.titles, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'kind_id' })
  kindType: KindType;

  @ManyToOne(() => Title, (title) => title.episodes, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn({ name: 'episode_of_id' })
  episodeOf: Title | null;

  @OneToMany(() => Title, (title) => title.episodeOf)
  episodes: Title[];

  @OneToMany(() => AkaTitle, (aka) => aka.movie)
  akaTitles: AkaTitle[];

  @OneToMany(() => CastInfo, (cast) => cast.movie)
  castInfos: CastInfo[];

  @OneToMany(() => MovieCompanies, (mc) => mc.movie)
  movieCompanies: MovieCompanies[];

  @OneToMany(() => MovieInfo, (mi) => mi.movie)
  movieInfos: MovieInfo[];

  @OneToMany(() => MovieInfoIdx, (mi) => mi.movie)
  movieInfoIdxs: MovieInfoIdx[];

  @OneToMany(() => MovieKeyword, (mk) => mk.movie)
  movieKeywords: MovieKeyword[];

  @OneToMany(() => MovieLink, (ml) => ml.movie)
  movieLinks: MovieLink[];

  @OneToMany(() => MovieLink, (ml) => ml.linkedMovie)
  linkedFrom: MovieLink[];

  @OneToMany(() => CompleteCast, (cc) => cc.movie)
  completeCasts: CompleteCast[];
}
