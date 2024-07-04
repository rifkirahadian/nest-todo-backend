import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'comments',
})
export class Comment extends Model {
  @Column
  userId: number;

  @Column
  taskId: number;

  @Column
  comment: string;
}
