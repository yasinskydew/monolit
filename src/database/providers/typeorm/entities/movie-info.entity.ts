import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { InfoType } from './info-type.entity';
import { Title } from './title.entity';

@Entity({ name: 'movie_info' })
export class MovieInfo {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  movie_id: number;

  @Column({ type: 'int' })
  info_type_id: number;

  @Column({ type: 'varchar' })
  info: string;

  @Column({ type: 'varchar', nullable: true })
  note: string | null;

  @ManyToOne(() => Title, (title) => title.movieInfos, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Title;

  @ManyToOne(() => InfoType, (infoType) => infoType.movieInfos, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'info_type_id' })
  infoType: InfoType;
}
