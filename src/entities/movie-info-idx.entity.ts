import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { InfoType } from './info-type.entity';
import { Title } from './title.entity';

@Entity({ name: 'movie_info_idx' })
export class MovieInfoIdx {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  movie_id: number;

  @Column({ type: 'int' })
  info_type_id: number;

  @Column({ type: 'varchar' })
  info: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  note: string | null;

  @ManyToOne(() => Title, (title) => title.movieInfoIdxs, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Title;

  @ManyToOne(() => InfoType, (infoType) => infoType.movieInfoIdxs, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'info_type_id' })
  infoType: InfoType;
}
