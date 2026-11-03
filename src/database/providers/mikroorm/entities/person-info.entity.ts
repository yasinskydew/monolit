import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { InfoType } from './info-type.entity';
import { Name } from './name.entity';

@Entity({ tableName: 'person_info' })
export class PersonInfo {
  @PrimaryKey()
  id!: number;



  @Property({ nullable: false })
  info!: string;

  @Property({ nullable: true })
  note?: string | null;

  @ManyToOne({ entity: () => Name, fieldName: 'person_id' })
  person!: Name;

  @ManyToOne({ entity: () => InfoType, fieldName: 'info_type_id' })
  infoType!: InfoType;

}
