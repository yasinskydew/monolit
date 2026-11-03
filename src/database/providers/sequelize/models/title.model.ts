import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { AkaTitle } from './aka-title.model';
import { CastInfo } from './cast-info.model';
import { CompleteCast } from './complete-cast.model';
import { KindType } from './kind-type.model';
import { MovieCompanies } from './movie-companies.model';
import { MovieInfo } from './movie-info.model';
import { MovieInfoIdx } from './movie-info-idx.model';
import { MovieKeyword } from './movie-keyword.model';
import { MovieLink } from './movie-link.model';

@Table({ tableName: 'title', timestamps: false })
export class Title extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare imdb_index: string | null;

  @ForeignKey(() => KindType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare kind_id: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare production_year: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare imdb_id: number | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare phonetic_code: string | null;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare episode_of_id: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare season_nr: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare episode_nr: number | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare series_years: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare md5sum: string | null;

  @BelongsTo(() => KindType, { foreignKey: 'kind_id', constraints: false })
  declare kindType?: KindType;

  @BelongsTo(() => Title, { foreignKey: 'episode_of_id', constraints: false })
  declare episodeOf?: Title;

  @HasMany(() => Title, { foreignKey: 'episode_of_id', constraints: false })
  declare episodes?: Title[];

  @HasMany(() => AkaTitle, { foreignKey: 'movie_id', constraints: false })
  declare akaTitles?: AkaTitle[];

  @HasMany(() => CastInfo, { foreignKey: 'movie_id', constraints: false })
  declare castInfos?: CastInfo[];

  @HasMany(() => MovieCompanies, { foreignKey: 'movie_id', constraints: false })
  declare movieCompanies?: MovieCompanies[];

  @HasMany(() => MovieInfo, { foreignKey: 'movie_id', constraints: false })
  declare movieInfos?: MovieInfo[];

  @HasMany(() => MovieInfoIdx, { foreignKey: 'movie_id', constraints: false })
  declare movieInfoIdxs?: MovieInfoIdx[];

  @HasMany(() => MovieKeyword, { foreignKey: 'movie_id', constraints: false })
  declare movieKeywords?: MovieKeyword[];

  @HasMany(() => MovieLink, { foreignKey: 'movie_id', constraints: false })
  declare movieLinks?: MovieLink[];

  @HasMany(() => MovieLink, { foreignKey: 'linked_movie_id', constraints: false })
  declare linkedFrom?: MovieLink[];

  @HasMany(() => CompleteCast, { foreignKey: 'movie_id', constraints: false })
  declare completeCasts?: CompleteCast[];

}
