import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';
import { MovieCompanies } from './movie-companies.entity';

@Entity({ tableName: 'company_name' })
export class CompanyName {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: true })
  country_code?: string | null;

  @Property({ nullable: true })
  imdb_id?: number | null;

  @Property({ nullable: true })
  name_pcode_nf?: string | null;

  @Property({ nullable: true })
  name_pcode_sf?: string | null;

  @Property({ nullable: true })
  md5sum?: string | null;

  @OneToMany(() => MovieCompanies, (e) => e.company)
  movieCompanies = new Collection<MovieCompanies>(this);

}
