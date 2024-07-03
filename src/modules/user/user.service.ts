import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: typeof User,
  ) {}

  create(payload: RegisterDto): Promise<User> {
    return this.usersRepository.create({ ...payload });
  }

  findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async validateUserUniqueEmail(email: string) {
    const user = await this.findOneByEmail(email);
    if (user) {
      throw new BadRequestException(`Email '${email}' has been used`);
    }
  }
}
