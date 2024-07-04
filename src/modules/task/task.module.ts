import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { tasksProviders } from './entities/task.provider';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { usersProviders } from '../user/entities/user.provider';

@Module({
  controllers: [TaskController],
  providers: [
    TaskService,
    JwtService,
    UserService,
    ...tasksProviders,
    ...usersProviders,
  ],
})
export class TaskModule {}
