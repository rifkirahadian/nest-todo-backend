import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
  tableName: 'comments',
})
export class Comment extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Column
  taskId: number;

  @Column
  comment: string;

  @BelongsTo(() => User)
  user: User;
}
