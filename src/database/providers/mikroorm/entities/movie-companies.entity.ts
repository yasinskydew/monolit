import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { CompanyName } from './company-name.entity';
import { CompanyType } from './company-type.entity';
import { Title } from './title.entity';

@Entity({ tableName: 'movie_companies' })
export class MovieCompanies {
  @PrimaryKey()
  id!: number;




  @Property({ nullable: true })
  note?: string | null;

  @ManyToOne({ entity: () => Title, fieldName: 'movie_id' })
  movie!: Title;

  @ManyToOne({ entity: () => CompanyName, fieldName: 'company_id' })
  company!: CompanyName;

  @ManyToOne({ entity: () => CompanyType, fieldName: 'company_type_id' })
  companyType!: CompanyType;

}
