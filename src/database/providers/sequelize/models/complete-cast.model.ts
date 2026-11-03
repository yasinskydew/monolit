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
import { CompCastType } from './comp-cast-type.model';
import { Title } from './title.model';

@Table({ tableName: 'complete_cast', timestamps: false })
export class CompleteCast extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Title)
  @Column({ type: DataType.INTEGER, allowNull: true })
  declare movie_id: number | null;

  @ForeignKey(() => CompCastType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare subject_id: number;

  @ForeignKey(() => CompCastType)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare status_id: number;

  @BelongsTo(() => Title, { foreignKey: 'movie_id', constraints: false })
  declare movie?: Title;

  @BelongsTo(() => CompCastType, { foreignKey: 'subject_id', constraints: false })
  declare subjectType?: CompCastType;

  @BelongsTo(() => CompCastType, { foreignKey: 'status_id', constraints: false })
  declare statusType?: CompCastType;

}
