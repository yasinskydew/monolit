import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';
import { CastInfo } from './cast-info.entity';

@Entity({ tableName: 'char_name' })
export class CharName {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  name!: string;

  @Property({ nullable: true })
  imdb_index?: string | null;

  @Property({ nullable: true })
  imdb_id?: number | null;

  @Property({ nullable: true })
  name_pcode_nf?: string | null;

  @Property({ nullable: true })
  surname_pcode?: string | null;

  @Property({ nullable: true })
  md5sum?: string | null;

  @OneToMany(() => CastInfo, (e) => e.character)
  castInfos = new Collection<CastInfo>(this);

}
