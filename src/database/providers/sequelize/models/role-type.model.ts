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
import { CastInfo } from './cast-info.model';

@Table({ tableName: 'role_type', timestamps: false })
export class RoleType extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare role: string;

  @HasMany(() => CastInfo, { foreignKey: 'role_id', constraints: false })
  declare castInfos?: CastInfo[];

}
