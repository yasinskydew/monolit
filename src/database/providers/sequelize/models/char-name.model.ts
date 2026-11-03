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

@Table({ tableName: 'char_name', timestamps: false })
export class CharName extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare imdb_index: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare imdb_id: number | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare name_pcode_nf: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare surname_pcode: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare md5sum: string | null;

  @HasMany(() => CastInfo, { foreignKey: 'person_role_id', constraints: false })
  declare castInfos?: CastInfo[];

}
