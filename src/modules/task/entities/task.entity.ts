import { Column, Model, Table } from 'sequelize-typescript';

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

  @Column
  userAssigneeId: number;

  @Column
  deletedAt: Date;
}
