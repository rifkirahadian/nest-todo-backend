import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { hashPassword } from 'src/utils/password';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() payload: RegisterDto, @Res() res: Response) {
    const password = await hashPassword(payload.password);
    try {
      await this.userService.validateUserUniqueEmail(payload.email);
      await this.userService.create({
        ...payload,
        password,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
      });
    }
    return res.json({
      message: 'User registered',
    });
  }
}
