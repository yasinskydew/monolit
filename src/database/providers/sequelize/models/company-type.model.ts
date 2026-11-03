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

@Table({ tableName: 'company_type', timestamps: false })
export class CompanyType extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare kind: string | null;

  @HasMany(() => MovieCompanies, { foreignKey: 'company_type_id', constraints: false })
  declare movieCompanies?: MovieCompanies[];

}
