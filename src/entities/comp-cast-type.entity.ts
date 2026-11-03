import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CompleteCast } from './complete-cast.entity';

@Entity({ name: 'comp_cast_type' })
export class CompCastType {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 32 })
  kind: string;

  @OneToMany(() => CompleteCast, (cc) => cc.subjectType)
  subjectCasts: CompleteCast[];

  @OneToMany(() => CompleteCast, (cc) => cc.statusType)
  statusCasts: CompleteCast[];
}
