import { Collection } from '@mikro-orm/core';
import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/decorators/legacy';
import { MovieInfo } from './movie-info.entity';
import { MovieInfoIdx } from './movie-info-idx.entity';
import { PersonInfo } from './person-info.entity';

@Entity({ tableName: 'info_type' })
export class InfoType {
  @PrimaryKey()
  id!: number;

  @Property({ nullable: false })
  info!: string;

  @OneToMany(() => MovieInfo, (e) => e.infoType)
  movieInfos = new Collection<MovieInfo>(this);

  @OneToMany(() => MovieInfoIdx, (e) => e.infoType)
  movieInfoIdxs = new Collection<MovieInfoIdx>(this);

  @OneToMany(() => PersonInfo, (e) => e.infoType)
  personInfos = new Collection<PersonInfo>(this);

}
