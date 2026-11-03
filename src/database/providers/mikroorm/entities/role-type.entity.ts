import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';
import { CastInfo } from './cast-info.entity';

@Entity({ tableName: 'role_type' })
export class RoleType {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  role!: string;

  @OneToMany(() => CastInfo, (e) => e.roleType)
  castInfos = new Collection<CastInfo>(this);

}
