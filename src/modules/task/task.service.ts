import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { Op } from 'sequelize';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: typeof Task,
  ) {}

  create(payload: CreateTaskDto, userCreatedId: number): Promise<Task> {
    return this.tasksRepository.create({ ...payload, userCreatedId });
  }

  findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.findAll({
      where: {
        [Op.or]: [{ userCreatedId: userId }, { userAssigneeId: userId }],
        deletedAt: null,
      },
    });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findByPk(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(task: Task, updateTaskDto: CreateTaskDto): Promise<Task> {
    task.set({ ...updateTaskDto });
    await task.save();

    return task;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
