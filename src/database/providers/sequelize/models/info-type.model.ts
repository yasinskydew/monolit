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
import { MovieInfo } from './movie-info.model';
import { MovieInfoIdx } from './movie-info-idx.model';
import { PersonInfo } from './person-info.model';

@Table({ tableName: 'info_type', timestamps: false })
export class InfoType extends Model {
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare info: string;

  @HasMany(() => MovieInfo, { foreignKey: 'info_type_id', constraints: false })
  declare movieInfos?: MovieInfo[];

  @HasMany(() => MovieInfoIdx, { foreignKey: 'info_type_id', constraints: false })
  declare movieInfoIdxs?: MovieInfoIdx[];

  @HasMany(() => PersonInfo, { foreignKey: 'info_type_id', constraints: false })
  declare personInfos?: PersonInfo[];

}
