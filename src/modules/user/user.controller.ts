import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto } from './dto/register.dto';
import { hashPassword, isMatchPassword } from 'src/utils/password';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { jwtConstants } from 'src/constants/jwt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

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

  @Post('login')
  async login(@Body() payload: LoginDto, @Res() res: Response) {
    const user = await this.userService.findOneByEmail(payload.email);
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Email not found',
      });
    }

    const passwordCheck = await isMatchPassword(
      payload.password,
      user.password,
    );
    if (!passwordCheck) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Password does not match',
      });
    }

    const { id, name, email } = user;
    const token = this.jwtService.sign(
      {
        id,
        name,
        email,
      },
      {
        secret: jwtConstants.secret,
      },
    );
    return res.json({
      access_token: token,
    });
  }
}
