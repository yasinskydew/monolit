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
import { InfoType } from './info-type.model';
import { Title } from './title.model';

@Table({ tableName: 'movie_info_idx', timestamps: false })
export class MovieInfoIdx extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare movie_id: number;

  @ForeignKey(() => InfoType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare info_type_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare info: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare note: string | null;

  @BelongsTo(() => Title, { foreignKey: 'movie_id', constraints: false })
  declare movie?: Title;

  @BelongsTo(() => InfoType, { foreignKey: 'info_type_id', constraints: false })
  declare infoType?: InfoType;

}
