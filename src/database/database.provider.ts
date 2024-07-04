import { Sequelize } from 'sequelize-typescript';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { Notification } from 'src/modules/notification/entities/notification.entity';
import { Task } from 'src/modules/task/entities/task.entity';
import { User } from 'src/modules/user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '.db/data.sqlite3',
      });
      sequelize.addModels([User, Task, Notification, Comment]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
