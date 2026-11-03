import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MovieCompanies } from './movie-companies.entity';

@Entity({ name: 'company_type' })
export class CompanyType {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 32, nullable: true })
  kind: string | null;

  @OneToMany(() => MovieCompanies, (mc) => mc.companyType)
  movieCompanies: MovieCompanies[];
}
