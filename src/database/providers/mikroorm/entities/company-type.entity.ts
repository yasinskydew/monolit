import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';
import { MovieCompanies } from './movie-companies.entity';

@Entity({ tableName: 'company_type' })
export class CompanyType {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  kind?: string | null;

  @OneToMany(() => MovieCompanies, (e) => e.companyType)
  movieCompanies = new Collection<MovieCompanies>(this);

}
