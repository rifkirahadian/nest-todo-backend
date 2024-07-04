import { Inject, Injectable } from '@nestjs/common';
import { CreateNotificationEvent } from './events/create-notification.event';
import { OnEvent } from '@nestjs/event-emitter';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NOTIFICATIONS_REPOSITORY')
    private notificationsRepository: typeof Notification,
  ) {}

  @OnEvent('notification.create')
  handleOrderCreatedEvent(
    payload: CreateNotificationEvent,
  ): Promise<Notification> {
    return this.notificationsRepository.create({ ...payload });
  }
}
