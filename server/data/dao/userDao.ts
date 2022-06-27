import { DaoInterface } from './dao.interface';
import { User } from '../models/user';
import { Bill } from '../models/bill';
import { Attributes, FindOptions, Model } from 'sequelize';
import { SequelizeFactory } from '../factory/sequelizeFactory';

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
      await User.create({ ...user }, { transaction: t });
    });
  }

  async findAll(): Promise<User[]> {
    return await sequelize.transaction(async (t) => {
      return await User.findAll({ include: Bill, transaction: t }).then(
        (users) => users
      );
    });
  }

  async findById(id: number | string): Promise<User | null> {
    return await sequelize.transaction(async (t) => {
      return await User.findByPk(id, { include: Bill, transaction: t });
    });
  }

  async destroy(id: number | string): Promise<void> {
    return await sequelize.transaction(async (t) => {
      return await User.findByPk(id, { transaction: t }).then((user) => {
        if (user) {
          return user.destroy();
        }
        return Promise.reject();
      });
    });
  }

  async findOneBy(query: FindOptions<Attributes<User>>): Promise<User | null> {
    return await sequelize.transaction(async (t) => {
      return await User.findOne({ ...query, transaction: t });
    });
  }

  async update(toUpdate: UserDefinition): Promise<number> {
    const { id, job, version } = toUpdate;
    return await sequelize.transaction(async (t) => {
      let promise = await User.update(
        { job },
        { where: { id, version }, transaction: t }
      );
      return promise[0];
    });
  }

  async findeAllBy(
    query: FindOptions<Attributes<Model<User>>>
  ): Promise<User[] | null> {
    return await sequelize.transaction(async (t) => {
      return await User.findAll({ ...query, transaction: t });
    });
  }
}
