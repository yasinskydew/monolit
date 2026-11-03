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
import { Title } from './title.model';

@Table({ tableName: 'kind_type', timestamps: false })
export class KindType extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare kind: string | null;

  @HasMany(() => Title, { foreignKey: 'kind_id', constraints: false })
  declare titles?: Title[];

  @HasMany(() => AkaTitle, { foreignKey: 'kind_id', constraints: false })
  declare akaTitles?: AkaTitle[];

}
