import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { CharName } from './char-name.entity';
import { Name } from './name.entity';
import { RoleType } from './role-type.entity';
import { Title } from './title.entity';

@Entity({ tableName: 'cast_info' })
export class CastInfo {
  @PrimaryKey()
  id!: number;




  @Property({ nullable: true })
  note?: string | null;

  @Property({ nullable: true })
  nr_order?: number | null;


  @ManyToOne({ entity: () => Name, fieldName: 'person_id' })
  person!: Name;

  @ManyToOne({ entity: () => Title, fieldName: 'movie_id' })
  movie!: Title;

  @ManyToOne({ entity: () => CharName, fieldName: 'person_role_id', nullable: true })
  character?: CharName | null;

  @ManyToOne({ entity: () => RoleType, fieldName: 'role_id' })
  roleType!: RoleType;

}
