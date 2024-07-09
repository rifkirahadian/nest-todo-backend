/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
  Request,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth';
import { Response } from 'express';
import { TaskGuard } from 'src/guards/task';
import { UserService } from '../user/user.service';
import { AssignTaskDto } from './dto/assign-task.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateNotificationEvent } from '../notification/events/create-notification.event';

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly userService: UserService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Res() res: Response,
    @Request() req,
  ) {
    try {
      const user = req.user;
      const data = await this.taskService.create(createTaskDto, user.id);

      return res.json({
        message: 'Task created',
        data,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response, @Request() req) {
    const user = req.user;
    const data = await this.taskService.findAll(user.id);
    return res.json({
      data,
    });
  }

  @UseGuards(TaskGuard)
  @Get(':id')
  findOne(@Request() req, @Param('id') _id: string) {
    return req.task;
  }

  @Patch('assign')
  async assign(@Body() assignTaskDto: AssignTaskDto, @Res() res: Response) {
    const user = await this.userService.findOneByEmail(assignTaskDto.email);
    const task = await this.taskService.findOne(assignTaskDto.taskId);

    if (!user) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Email not found',
      });
    }

    if (!task) {
      return res.status(HttpStatus.NOT_FOUND).json({
        message: 'Task not found',
      });
    }

    const assignTask = await this.taskService.assignTask(task, user.id);

    this.eventEmitter.emit(
      'notification.create',
      new CreateNotificationEvent({
        content: `Task ${task.title} has been assigned to you`,
        userId: user.id,
        taskId: task.id,
        commentId: null,
        type: 'task-assign',
      }),
    );

    return res.json({
      message: 'Task assigned',
      data: assignTask,
    });
  }

  @UseGuards(TaskGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateTaskDto: CreateTaskDto,
    @Res() res: Response,
  ) {
    try {
      const task = await this.taskService.findOne(id);
      const updateTask = await this.taskService.update(task, updateTaskDto);

      return res.json({
        message: 'Task updated',
        data: updateTask,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }

  @UseGuards(TaskGuard)
  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    try {
      await this.taskService.remove(id);

      return res.json({
        message: 'Task deleted',
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
  }
}
