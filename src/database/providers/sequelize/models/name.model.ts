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
import { AkaName } from './aka-name.model';
import { CastInfo } from './cast-info.model';
import { PersonInfo } from './person-info.model';

@Table({ tableName: 'name', timestamps: false })
export class Name extends Model {
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
  declare gender: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare name_pcode_cf: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare name_pcode_nf: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare surname_pcode: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare md5sum: string | null;

  @HasMany(() => AkaName, { foreignKey: 'person_id', constraints: false })
  declare akaNames?: AkaName[];

  @HasMany(() => CastInfo, { foreignKey: 'person_id', constraints: false })
  declare castInfos?: CastInfo[];

  @HasMany(() => PersonInfo, { foreignKey: 'person_id', constraints: false })
  declare personInfos?: PersonInfo[];

}
