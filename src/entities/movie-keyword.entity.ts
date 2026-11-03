import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { Keyword } from './keyword.entity';
import { Title } from './title.entity';

@Entity({ name: 'movie_keyword' })
export class MovieKeyword {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  movie_id: number;

  @Column({ type: 'int' })
  keyword_id: number;

  @ManyToOne(() => Title, (title) => title.movieKeywords, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Title;

  @ManyToOne(() => Keyword, (keyword) => keyword.movieKeywords, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'keyword_id' })
  keywordRef: Keyword;
}
