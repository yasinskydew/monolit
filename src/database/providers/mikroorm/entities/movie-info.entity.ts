import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { InfoType } from './info-type.entity';
import { Title } from './title.entity';

@Entity({ tableName: 'movie_info' })
export class MovieInfo {
  @PrimaryKey()
  id!: number;



  @Property({ nullable: false })
  info!: string;

  @Property({ nullable: true })
  note?: string | null;

  @ManyToOne({ entity: () => Title, fieldName: 'movie_id' })
  movie!: Title;

  @ManyToOne({ entity: () => InfoType, fieldName: 'info_type_id' })
  infoType!: InfoType;

}
