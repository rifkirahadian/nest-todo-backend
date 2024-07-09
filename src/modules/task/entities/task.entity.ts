import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

@Table({
  tableName: 'tasks',
})
export class Task extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  status: string;

  @Column
  dueDate: Date;

  @Column
  userCreatedId: number;

  @ForeignKey(() => User)
  @Column
  userAssigneeId: number;

  @Column
  deletedAt: Date;

  @BelongsTo(() => User)
  userAssignee: User;
}
