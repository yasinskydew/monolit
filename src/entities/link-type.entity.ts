import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { MovieLink } from './movie-link.entity';

@Entity({ name: 'link_type' })
export class LinkType {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 32 })
  link: string;

  @OneToMany(() => MovieLink, (ml) => ml.linkType)
  movieLinks: MovieLink[];
}
