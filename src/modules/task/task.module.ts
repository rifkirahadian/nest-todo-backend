import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { tasksProviders } from './entities/task.provider';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [TaskController],
  providers: [TaskService, JwtService, ...tasksProviders],
})
export class TaskModule {}
