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
import { MovieLink } from './movie-link.model';

@Table({ tableName: 'link_type', timestamps: false })
export class LinkType extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare link: string;

  @HasMany(() => MovieLink, { foreignKey: 'link_type_id', constraints: false })
  declare movieLinks?: MovieLink[];

}
