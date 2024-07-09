import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Request,
  Get,
  Query,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/guards/auth';
import { ApiBearerAuth } from '@nestjs/swagger';
import { TaskService } from '../task/task.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateNotificationEvent } from '../notification/events/create-notification.event';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private readonly taskService: TaskService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @Res() res: Response,
    @Request() req,
  ) {
    const user = req.user;
    const task = await this.taskService.findOne(createCommentDto.taskId);
    const comment = await this.commentService.create(createCommentDto, user.id);

    let userId = null;
    if (task.userCreatedId !== user.id) {
      userId = task.userCreatedId;
    }

    if (task.userCreatedId === user.id && task.userAssigneeId) {
      userId = task.userAssigneeId;
    }

    if (userId) {
      this.eventEmitter.emit(
        'notification.create',
        new CreateNotificationEvent({
          content: `Someone comment at ${task.title} Task`,
          userId,
          taskId: task.id,
          commentId: null,
          type: 'comment',
        }),
      );
    }

    return res.json({
      message: 'Comment created',
      data: comment,
    });
  }

  @Get()
  async findAll(@Res() res: Response, @Query('taskId') taskId: number) {
    const data = await this.commentService.findAll(taskId);
    return res.json({
      data,
    });
  }
}
