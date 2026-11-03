import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';
import { MovieKeyword } from './movie-keyword.entity';

@Entity({ tableName: 'keyword' })
export class Keyword {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  keyword!: string;

  @Property({ nullable: true })
  phonetic_code?: string | null;

  @OneToMany(() => MovieKeyword, (e) => e.keywordRef)
  movieKeywords = new Collection<MovieKeyword>(this);

}
