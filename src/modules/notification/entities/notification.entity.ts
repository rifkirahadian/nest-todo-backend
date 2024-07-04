import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'notifications',
})
export class Notification extends Model {
  @Column
  content: string;

  @Column
  type: string;

  @Column
  userId: number;

  @Column
  taskId: number;

  @Column
  commentId: number;

  @Column
  isRed: boolean;
}
