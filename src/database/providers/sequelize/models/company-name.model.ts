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
import { MovieCompanies } from './movie-companies.model';

@Table({ tableName: 'company_name', timestamps: false })
export class CompanyName extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare country_code: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  declare imdb_id: number | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare name_pcode_nf: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare name_pcode_sf: string | null;

  @Column({ type: DataType.STRING, allowNull: true })
  declare md5sum: string | null;

  @HasMany(() => MovieCompanies, { foreignKey: 'company_id', constraints: false })
  declare movieCompanies?: MovieCompanies[];

}
