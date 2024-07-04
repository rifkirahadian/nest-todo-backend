import {
  Controller,
  Get,
  Post,
  Body,
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

@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

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
}
