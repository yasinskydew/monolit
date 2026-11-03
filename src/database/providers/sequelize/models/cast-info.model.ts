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
import { CharName } from './char-name.model';
import { Name } from './name.model';
import { RoleType } from './role-type.model';
import { Title } from './title.model';

@Table({ tableName: 'cast_info', timestamps: false })
export class CastInfo extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Name)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare person_id: number;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare movie_id: number;

  @ForeignKey(() => CharName)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare person_role_id: number | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare note: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare nr_order: number | null;

  @ForeignKey(() => RoleType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare role_id: number;

  @BelongsTo(() => Name, { foreignKey: 'person_id', constraints: false })
  declare person?: Name;

  @BelongsTo(() => Title, { foreignKey: 'movie_id', constraints: false })
  declare movie?: Title;

  @BelongsTo(() => CharName, { foreignKey: 'person_role_id', constraints: false })
  declare character?: CharName;

  @BelongsTo(() => RoleType, { foreignKey: 'role_id', constraints: false })
  declare roleType?: RoleType;

}
