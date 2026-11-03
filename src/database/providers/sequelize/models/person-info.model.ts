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
import { Name } from './name.model';

@Table({ tableName: 'person_info', timestamps: false })
export class PersonInfo extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Name)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare person_id: number;

  @ForeignKey(() => InfoType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare info_type_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare info: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare note: string | null;

  @BelongsTo(() => Name, { foreignKey: 'person_id', constraints: false })
  declare person?: Name;

  @BelongsTo(() => InfoType, { foreignKey: 'info_type_id', constraints: false })
  declare infoType?: InfoType;

}
