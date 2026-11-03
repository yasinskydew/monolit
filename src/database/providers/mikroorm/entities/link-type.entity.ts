import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';
import { MovieLink } from './movie-link.entity';

@Entity({ tableName: 'link_type' })
export class LinkType {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  link!: string;

  @OneToMany(() => MovieLink, (e) => e.linkType)
  movieLinks = new Collection<MovieLink>(this);

}
