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
import { LinkType } from './link-type.model';
import { Title } from './title.model';

@Table({ tableName: 'movie_link', timestamps: false })
export class MovieLink extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare movie_id: number;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare linked_movie_id: number;

  @ForeignKey(() => LinkType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare link_type_id: number;

  @BelongsTo(() => Title, { foreignKey: 'movie_id', constraints: false })
  declare movie?: Title;

  @BelongsTo(() => Title, { foreignKey: 'linked_movie_id', constraints: false })
  declare linkedMovie?: Title;

  @BelongsTo(() => LinkType, { foreignKey: 'link_type_id', constraints: false })
  declare linkType?: LinkType;

}
