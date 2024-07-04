import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { notificationsProviders } from './entities/notification.provider';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, ...notificationsProviders],
})
export class NotificationModule {}
