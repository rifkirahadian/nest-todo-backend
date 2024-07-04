import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { TaskModule } from './modules/task/task.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NotificationModule } from './modules/notification/notification.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    TaskModule,
    EventEmitterModule.forRoot(),
    NotificationModule,
    CommentModule,
  ],
})
export class AppModule {}
