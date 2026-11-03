import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from 'typeorm';
import { InfoType } from './info-type.entity';
import { Name } from './name.entity';

@Entity({ name: 'person_info' })
export class PersonInfo {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'int' })
  person_id: number;

  @Column({ type: 'int' })
  info_type_id: number;

  @Column({ type: 'varchar' })
  info: string;

  @Column({ type: 'varchar', nullable: true })
  note: string | null;

  @ManyToOne(() => Name, (name) => name.personInfos, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'person_id' })
  person: Name;

  @ManyToOne(() => InfoType, (infoType) => infoType.personInfos, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'info_type_id' })
  infoType: InfoType;
}
