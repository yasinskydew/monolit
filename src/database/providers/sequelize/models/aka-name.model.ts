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
import { Name } from './name.model';

@Table({ tableName: 'aka_name', timestamps: false })
export class AkaName extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Name)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare person_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare name: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare imdb_index: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare name_pcode_cf: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare name_pcode_nf: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare surname_pcode: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare md5sum: string | null;

  @BelongsTo(() => Name, { foreignKey: 'person_id', constraints: false })
  declare person?: Name;

}
