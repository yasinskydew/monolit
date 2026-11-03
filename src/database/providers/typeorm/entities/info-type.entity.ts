import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MovieInfo } from './movie-info.entity';
import { MovieInfoIdx } from './movie-info-idx.entity';
import { PersonInfo } from './person-info.entity';

@Entity({ name: 'info_type' })
export class InfoType {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 32 })
  info: string;

  @OneToMany(() => MovieInfo, (mi) => mi.infoType)
  movieInfos: MovieInfo[];

  @OneToMany(() => MovieInfoIdx, (mi) => mi.infoType)
  movieInfoIdxs: MovieInfoIdx[];

  @OneToMany(() => PersonInfo, (pi) => pi.infoType)
  personInfos: PersonInfo[];
}
