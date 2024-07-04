import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { commentsProviders } from './entities/comment.provider';
import { TaskService } from '../task/task.service';
import { tasksProviders } from '../task/entities/task.provider';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [CommentController],
  providers: [
    JwtService,
    CommentService,
    ...commentsProviders,
    TaskService,
    ...tasksProviders,
  ],
})
export class CommentModule {}
