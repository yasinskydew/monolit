import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';
import { CompleteCast } from './complete-cast.entity';

@Entity({ tableName: 'comp_cast_type' })
export class CompCastType {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  kind!: string;

  @OneToMany(() => CompleteCast, (e) => e.subjectType)
  subjectCasts = new Collection<CompleteCast>(this);

  @OneToMany(() => CompleteCast, (e) => e.statusType)
  statusCasts = new Collection<CompleteCast>(this);

}
