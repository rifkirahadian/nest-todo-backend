import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [DatabaseModule, UserModule, TaskModule],
})
export class AppModule {}
