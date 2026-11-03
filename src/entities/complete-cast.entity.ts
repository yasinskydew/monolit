import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { CompCastType } from './comp-cast-type.entity';
import { Title } from './title.entity';

@Entity({ name: 'complete_cast' })
export class CompleteCast {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int', nullable: true })
  movie_id: number | null;

  @Column({ type: 'int' })
  subject_id: number;

  @Column({ type: 'int' })
  status_id: number;

  @ManyToOne(() => Title, (title) => title.completeCasts, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Title | null;

  @ManyToOne(() => CompCastType, (cct) => cct.subjectCasts, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'subject_id' })
  subjectType: CompCastType;

  @ManyToOne(() => CompCastType, (cct) => cct.statusCasts, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'status_id' })
  statusType: CompCastType;
}
