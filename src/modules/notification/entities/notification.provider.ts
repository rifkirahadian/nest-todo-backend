import { Notification } from './notification.entity';

export const notificationsProviders = [
  {
    provide: 'NOTIFICATIONS_REPOSITORY',
    useValue: Notification,
  },
];
