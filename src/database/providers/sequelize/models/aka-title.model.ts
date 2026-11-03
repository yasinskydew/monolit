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
import { KindType } from './kind-type.model';
import { Title } from './title.model';

@Table({ tableName: 'aka_title', timestamps: false })
export class AkaTitle extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare movie_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare title: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare imdb_index: string | null;

  @ForeignKey(() => KindType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare kind_id: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare production_year: number | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare phonetic_code: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare episode_of_id: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare season_nr: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare episode_nr: number | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare note: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare md5sum: string | null;

  @BelongsTo(() => Title, { foreignKey: 'movie_id', constraints: false })
  declare movie?: Title;

  @BelongsTo(() => KindType, { foreignKey: 'kind_id', constraints: false })
  declare kindType?: KindType;

}
