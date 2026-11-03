import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { AkaName } from './aka-name.entity';
import { CastInfo } from './cast-info.entity';
import { PersonInfo } from './person-info.entity';

@Entity({ name: 'name' })
export class Name {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', length: 9, nullable: true })
  imdb_index: string | null;

  @Column({ type: 'int', nullable: true })
  imdb_id: number | null;

  @Column({ type: 'varchar', length: 1, nullable: true })
  gender: string | null;

  @Column({ type: 'varchar', length: 5, nullable: true })
  name_pcode_cf: string | null;

  @Column({ type: 'varchar', length: 5, nullable: true })
  name_pcode_nf: string | null;

  @Column({ type: 'varchar', length: 5, nullable: true })
  surname_pcode: string | null;

  @Column({ type: 'varchar', length: 32, nullable: true })
  md5sum: string | null;

  @OneToMany(() => AkaName, (aka) => aka.person)
  akaNames: AkaName[];

  @OneToMany(() => CastInfo, (cast) => cast.person)
  castInfos: CastInfo[];

  @OneToMany(() => PersonInfo, (pi) => pi.person)
  personInfos: PersonInfo[];
}
