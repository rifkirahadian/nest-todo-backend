import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/user/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '.db/data.sqlite3',
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
