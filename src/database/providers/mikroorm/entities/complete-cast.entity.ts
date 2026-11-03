import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/decorators/legacy';
import { CompCastType } from './comp-cast-type.entity';
import { Title } from './title.entity';

@Entity({ tableName: 'complete_cast' })
export class CompleteCast {
  @PrimaryKey()
  id!: number;




  @ManyToOne({ entity: () => Title, fieldName: 'movie_id', nullable: true })
  movie?: Title | null;

  @ManyToOne({ entity: () => CompCastType, fieldName: 'subject_id' })
  subjectType!: CompCastType;

  @ManyToOne({ entity: () => CompCastType, fieldName: 'status_id' })
  statusType!: CompCastType;

}
