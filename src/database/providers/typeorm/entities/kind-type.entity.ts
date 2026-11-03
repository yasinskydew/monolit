import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { AkaTitle } from './aka-title.entity';
import { Title } from './title.entity';

@Entity({ name: 'kind_type' })
export class KindType {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 15, nullable: true })
  kind: string | null;

  @OneToMany(() => Title, (title) => title.kindType)
  titles: Title[];

  @OneToMany(() => AkaTitle, (aka) => aka.kindType)
  akaTitles: AkaTitle[];
}
