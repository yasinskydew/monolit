import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn
} from 'typeorm';
import { MovieKeyword } from './movie-keyword.entity';

@Entity({ name: 'keyword' })
export class Keyword {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  keyword: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  phonetic_code: string | null;

  @OneToMany(() => MovieKeyword, (mk) => mk.keywordRef)
  movieKeywords: MovieKeyword[];
}
