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
import { MovieKeyword } from './movie-keyword.model';

@Table({ tableName: 'keyword', timestamps: false })
export class Keyword extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare keyword: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare phonetic_code: string | null;

  @HasMany(() => MovieKeyword, { foreignKey: 'keyword_id', constraints: false })
  declare movieKeywords?: MovieKeyword[];

}
