import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @Inject('TASKS_REPOSITORY')
    private tasksRepository: typeof Task,
  ) {}

  create(payload: CreateTaskDto, userCreatedId: number): Promise<Task> {
    return this.tasksRepository.create({ ...payload, userCreatedId });
  }
}
