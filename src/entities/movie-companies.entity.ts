import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { CompanyName } from './company-name.entity';
import { CompanyType } from './company-type.entity';
import { Title } from './title.entity';

@Entity({ name: 'movie_companies' })
export class MovieCompanies {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  movie_id: number;

  @Column({ type: 'int' })
  company_id: number;

  @Column({ type: 'int' })
  company_type_id: number;

  @Column({ type: 'varchar', nullable: true })
  note: string | null;

  @ManyToOne(() => Title, (title) => title.movieCompanies, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Title;

  @ManyToOne(() => CompanyName, (company) => company.movieCompanies, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'company_id' })
  company: CompanyName;

  @ManyToOne(() => CompanyType, (type) => type.movieCompanies, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'company_type_id' })
  companyType: CompanyType;
}
