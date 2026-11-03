import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { Name } from './name.entity';

@Entity({ name: 'aka_name' })
export class AkaName {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  person_id: number;

  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Column({ type: 'varchar', length: 3, nullable: true })
  imdb_index: string | null;

  @Column({ type: 'varchar', length: 11, nullable: true })
  name_pcode_cf: string | null;

  @Column({ type: 'varchar', length: 11, nullable: true })
  name_pcode_nf: string | null;

  @Column({ type: 'varchar', length: 11, nullable: true })
  surname_pcode: string | null;

  @Column({ type: 'varchar', length: 65, nullable: true })
  md5sum: string | null;

  @ManyToOne(() => Name, (name) => name.akaNames, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'person_id' })
  person: Name;
}
