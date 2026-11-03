import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { CastInfo } from './cast-info.entity';

@Entity({ name: 'char_name' })
export class CharName {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', length: 2, nullable: true })
  imdb_index: string | null;

  @Column({ type: 'int', nullable: true })
  imdb_id: number | null;

  @Column({ type: 'varchar', length: 5, nullable: true })
  name_pcode_nf: string | null;

  @Column({ type: 'varchar', length: 5, nullable: true })
  surname_pcode: string | null;

  @Column({ type: 'varchar', length: 32, nullable: true })
  md5sum: string | null;

  @OneToMany(() => CastInfo, (cast) => cast.character)
  castInfos: CastInfo[];
}
