import { Attributes, FindOptions, Model } from 'sequelize';
import { Logger } from '../../util/logger';
import { SequelizeFactory } from '../factory/sequelizeFactory';
import { Bill } from '../models/bill';
import { User } from '../models/user';
import { DaoInterface } from './dao.interface';

export interface UserDefinition {
  id?: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  gender: string;
  address: string;
  city: string;
  job: string;
  version?: number;
}

const sequelize = SequelizeFactory.getInstance().getSequelize();

export class UserDao implements DaoInterface<User, UserDefinition> {
  async create(user: UserDefinition): Promise<void> {
    await sequelize.transaction(async (t) => {
      await User.create({ ...user }, { transaction: t }).catch(() => {
        Logger.error('failed to create user');
        return Promise.reject();
      });
    });
  }

  async findAll(): Promise<User[]> {
    return await sequelize.transaction(async (t) => {
      return await User.findAll({ include: Bill, transaction: t })
        .then((users) => users)
        .catch(() => {
          Logger.error('failed to fetch users');
          return Promise.reject();
        });
    });
  }

  async findById(id: number | string): Promise<User | null> {
    return await sequelize.transaction(async (t) => {
      return await User.findByPk(id, { include: Bill, transaction: t }).catch(
        () => {
          Logger.error(`failed to fetch user by id with given id: ${id}`);
          return Promise.reject();
        }
      );
    });
  }

  async destroy(id: number | string): Promise<void> {
    return await sequelize.transaction(async (t) => {
      return await User.findByPk(id, { transaction: t })
        .then((user) => {
          if (user) {
            return user.destroy();
          }
          return Promise.reject();
        })
        .catch(() => {
          Logger.error(`failed to delete user by id with given id: ${id}`);
          return Promise.reject();
        });
    });
  }

  async findOneBy(query: FindOptions<Attributes<User>>): Promise<User | null> {
    return await sequelize.transaction(async (t) => {
      return await User.findOne({ ...query, transaction: t }).catch(() => {
        Logger.error('failed to find single user with find options');
        return Promise.reject();
      });
    });
  }

  async update(toUpdate: UserDefinition): Promise<number> {
    const { id, job, version } = toUpdate;
    return await sequelize
      .transaction(async (t) => {
        /**
         * Version sollte eigentlich erhöht werden bei der Transaktion, wegen bug nicht möglich
         * https://github.com/sequelize/sequelize/issues/7831
         */
        let promise = await User.update(
          { job },
          { where: { id, version }, transaction: t }
        );
        return promise[0];
      })
      .catch(() => {
        Logger.error('failed to update user');
        return Promise.reject();
      });
  }

  async findeAllBy(
    query: FindOptions<Attributes<Model<User>>>
  ): Promise<User[] | null> {
    return await sequelize
      .transaction(async (t) => {
        return await User.findAll({ ...query, transaction: t });
      })
      .catch(() => {
        Logger.error('failed to find all users with find options');
        return Promise.reject();
      });
  }
}
