import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { LinkType } from './link-type.entity';
import { Title } from './title.entity';

@Entity({ name: 'movie_link' })
export class MovieLink {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  movie_id: number;

  @Column({ type: 'int' })
  linked_movie_id: number;

  @Column({ type: 'int' })
  link_type_id: number;

  @ManyToOne(() => Title, (title) => title.movieLinks, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Title;

  @ManyToOne(() => Title, (title) => title.linkedFrom, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'linked_movie_id' })
  linkedMovie: Title;

  @ManyToOne(() => LinkType, (linkType) => linkType.movieLinks, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'link_type_id' })
  linkType: LinkType;
}
