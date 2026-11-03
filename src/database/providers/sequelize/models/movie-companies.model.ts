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
import { CompanyName } from './company-name.model';
import { CompanyType } from './company-type.model';
import { Title } from './title.model';

@Table({ tableName: 'movie_companies', timestamps: false })
export class MovieCompanies extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare movie_id: number;

  @ForeignKey(() => CompanyName)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare company_id: number;

  @ForeignKey(() => CompanyType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare company_type_id: number;

  @Column({ type: DataType.STRING, allowNull: true })
  declare note: string | null;

  @BelongsTo(() => Title, { foreignKey: 'movie_id', constraints: false })
  declare movie?: Title;

  @BelongsTo(() => CompanyName, { foreignKey: 'company_id', constraints: false })
  declare company?: CompanyName;

  @BelongsTo(() => CompanyType, { foreignKey: 'company_type_id', constraints: false })
  declare companyType?: CompanyType;

}
