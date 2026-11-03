import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { Name } from './name.entity';

@Entity({ tableName: 'aka_name' })
export class AkaName {
  @PrimaryKey()
  id!: number;


  @Property({ nullable: true })
  name?: string | null;

  @Property({ nullable: true })
  imdb_index?: string | null;

  @Property({ nullable: true })
  name_pcode_cf?: string | null;

  @Property({ nullable: true })
  name_pcode_nf?: string | null;

  @Property({ nullable: true })
  surname_pcode?: string | null;

  @Property({ nullable: true })
  md5sum?: string | null;

  @ManyToOne({ entity: () => Name, fieldName: 'person_id' })
  person!: Name;

}
