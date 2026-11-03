import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { KindType } from './kind-type.entity';
import { Title } from './title.entity';

@Entity({ tableName: 'aka_title' })
export class AkaTitle {
  @PrimaryKey()
  id!: number;


  @Property({ nullable: true })
  title?: string | null;

  @Property({ nullable: true })
  imdb_index?: string | null;


  @Property({ nullable: true })
  production_year?: number | null;

  @Property({ nullable: true })
  phonetic_code?: string | null;

  @Property({ nullable: true })
  episode_of_id?: number | null;

  @Property({ nullable: true })
  season_nr?: number | null;

  @Property({ nullable: true })
  episode_nr?: number | null;

  @Property({ nullable: true })
  note?: string | null;

  @Property({ nullable: true })
  md5sum?: string | null;

  @ManyToOne({ entity: () => Title, fieldName: 'movie_id' })
  movie!: Title;

  @ManyToOne({ entity: () => KindType, fieldName: 'kind_id' })
  kindType!: KindType;

}
