import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { CompleteCast } from './complete-cast.model';

@Table({ tableName: 'comp_cast_type', timestamps: false })
export class CompCastType extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare kind: string;

  @HasMany(() => CompleteCast, { foreignKey: 'subject_id', constraints: false })
  declare subjectCasts?: CompleteCast[];

  @HasMany(() => CompleteCast, { foreignKey: 'status_id', constraints: false })
  declare statusCasts?: CompleteCast[];

}
