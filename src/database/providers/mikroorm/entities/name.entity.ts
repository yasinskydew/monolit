import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';
import { AkaName } from './aka-name.entity';
import { CastInfo } from './cast-info.entity';
import { PersonInfo } from './person-info.entity';

@Entity({ tableName: 'name' })
export class Name {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: true })
  imdb_index?: string | null;

  @Property({ nullable: true })
  imdb_id?: number | null;

  @Property({ nullable: true })
  gender?: string | null;

  @Property({ nullable: true })
  name_pcode_cf?: string | null;

  @Property({ nullable: true })
  name_pcode_nf?: string | null;

  @Property({ nullable: true })
  surname_pcode?: string | null;

  @Property({ nullable: true })
  md5sum?: string | null;

  @OneToMany(() => AkaName, (e) => e.person)
  akaNames = new Collection<AkaName>(this);

  @OneToMany(() => CastInfo, (e) => e.person)
  castInfos = new Collection<CastInfo>(this);

  @OneToMany(() => PersonInfo, (e) => e.person)
  personInfos = new Collection<PersonInfo>(this);

}
