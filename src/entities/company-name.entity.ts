import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { MovieCompanies } from './movie-companies.entity';

@Entity({ name: 'company_name' })
export class CompanyName {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  country_code: string | null;

  @Column({ type: 'int', nullable: true })
  imdb_id: number | null;

  @Column({ type: 'varchar', length: 5, nullable: true })
  name_pcode_nf: string | null;

  @Column({ type: 'varchar', length: 5, nullable: true })
  name_pcode_sf: string | null;

  @Column({ type: 'varchar', length: 32, nullable: true })
  md5sum: string | null;

  @OneToMany(() => MovieCompanies, (mc) => mc.company)
  movieCompanies: MovieCompanies[];
}
