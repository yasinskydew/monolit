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
import { Keyword } from './keyword.model';
import { Title } from './title.model';

@Table({ tableName: 'movie_keyword', timestamps: false })
export class MovieKeyword extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare movie_id: number;

  @ForeignKey(() => Keyword)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare keyword_id: number;

  @BelongsTo(() => Title, { foreignKey: 'movie_id', constraints: false })
  declare movie?: Title;

  @BelongsTo(() => Keyword, { foreignKey: 'keyword_id', constraints: false })
  declare keywordRef?: Keyword;

}
