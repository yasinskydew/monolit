import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';
import { AkaTitle } from './aka-title.entity';
import { Title } from './title.entity';

@Entity({ tableName: 'kind_type' })
export class KindType {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: true })
  kind?: string | null;

  @OneToMany(() => Title, (e) => e.kindType)
  titles = new Collection<Title>(this);

  @OneToMany(() => AkaTitle, (e) => e.kindType)
  akaTitles = new Collection<AkaTitle>(this);

}
