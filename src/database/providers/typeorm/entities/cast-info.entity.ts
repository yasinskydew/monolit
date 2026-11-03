import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { CharName } from './char-name.entity';
import { Name } from './name.entity';
import { RoleType } from './role-type.entity';
import { Title } from './title.entity';

@Entity({ name: 'cast_info' })
export class CastInfo {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  person_id: number;

  @Column({ type: 'int' })
  movie_id: number;

  @Column({ type: 'int', nullable: true })
  person_role_id: number | null;

  @Column({ type: 'varchar', nullable: true })
  note: string | null;

  @Column({ type: 'int', nullable: true })
  nr_order: number | null;

  @Column({ type: 'int' })
  role_id: number;

  @ManyToOne(() => Name, (name) => name.castInfos, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'person_id' })
  person: Name;

  @ManyToOne(() => Title, (title) => title.castInfos, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'movie_id' })
  movie: Title;

  @ManyToOne(() => CharName, (char) => char.castInfos, {
    createForeignKeyConstraints: false,
    nullable: true,
  })
  @JoinColumn({ name: 'person_role_id' })
  character: CharName | null;

  @ManyToOne(() => RoleType, (role) => role.castInfos, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'role_id' })
  roleType: RoleType;
}
