import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { Keyword } from './keyword.entity';
import { Title } from './title.entity';

@Entity({ tableName: 'movie_keyword' })
export class MovieKeyword {
  @PrimaryKey()
  id!: number;



  @ManyToOne({ entity: () => Title, fieldName: 'movie_id' })
  movie!: Title;

  @ManyToOne({ entity: () => Keyword, fieldName: 'keyword_id' })
  keywordRef!: Keyword;

}
