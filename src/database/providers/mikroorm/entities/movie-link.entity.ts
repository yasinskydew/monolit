import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { LinkType } from './link-type.entity';
import { Title } from './title.entity';

@Entity({ tableName: 'movie_link' })
export class MovieLink {
  @PrimaryKey()
  id!: number;




  @ManyToOne({ entity: () => Title, fieldName: 'movie_id' })
  movie!: Title;

  @ManyToOne({ entity: () => Title, fieldName: 'linked_movie_id' })
  linkedMovie!: Title;

  @ManyToOne({ entity: () => LinkType, fieldName: 'link_type_id' })
  linkType!: LinkType;

}
