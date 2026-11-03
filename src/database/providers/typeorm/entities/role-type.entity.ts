import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { CastInfo } from './cast-info.entity';

@Entity({ name: 'role_type' })
export class RoleType {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', length: 32 })
  role: string;

  @OneToMany(() => CastInfo, (cast) => cast.roleType)
  castInfos: CastInfo[];
}
