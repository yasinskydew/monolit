import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { KindType } from './kind-type.entity';
import { Title } from './title.entity';

@Entity({ name: 'aka_title' })
export class AkaTitle {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  movie_id: number;

  @Column({ type: 'varchar', nullable: true })
  title: string | null;

  @Column({ type: 'varchar', length: 4, nullable: true })
  imdb_index: string | null;

  @Column({ type: 'int' })
  kind_id: number;

  @Column({ type: 'int', nullable: true })
  production_year: number | null;

  @Column({ type: 'varchar', length: 5, nullable: true })
  phonetic_code: string | null;

  @Column({ type: 'int', nullable: true })
  episode_of_id: number | null;

  @Column({ type: 'int', nullable: true })
  season_nr: number | null;

  @Column({ type: 'int', nullable: true })
  episode_nr: number | null;

  @Column({ type: 'varchar', length: 72, nullable: true })
  note: string | null;

  @Column({ type: 'varchar', length: 32, nullable: true })
  md5sum: string | null;

  @ManyToOne(() => Title, (title) => title.akaTitles, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Title;

  @ManyToOne(() => KindType, (kind) => kind.akaTitles, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'kind_id' })
  kindType: KindType;
}
