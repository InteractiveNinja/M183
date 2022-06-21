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
}

const sequelize = SequelizeFactory.getInstance().getSequelize();

export class UserDao implements DaoInterface<User, UserDefinition> {
  create(user: UserDefinition): Promise<void> {
    return sequelize.transaction().then((t) => {
      return User.create({ ...user }, { transaction: t }).then();
    });
  }

  findAll(): Promise<User[]> {
    return sequelize.transaction().then((t) => {
      return User.findAll({ include: Bill, transaction: t }).then(
        (users) => users
      );
    });
  }

  findById(id: number | string): Promise<User | null> {
    return sequelize.transaction().then((t) => {
      return User.findByPk(id, { include: Bill, transaction: t });
    });
  }

  destroy(id: number | string): Promise<void> {
    return sequelize.transaction().then((t) => {
      return User.findByPk(id, { transaction: t }).then((user) => {
        if (user) {
          return user.destroy();
        }
        return Promise.reject();
      });
    });
  }

  findOneBy(query: FindOptions<Attributes<User>>): Promise<User | null> {
    return sequelize.transaction().then((t) => {
      return User.findOne({ ...query, transaction: t });
    });
  }

  update(toUpdate: UserDefinition): Promise<void> {
    const { id } = toUpdate;
    return sequelize.transaction().then((t) => {
      return User.findByPk(id, { transaction: t }).then((user) =>
        user?.update({ ...user, ...toUpdate }).then()
      );
    });
  }

  findeAllBy(
    query: FindOptions<Attributes<Model<User>>>
  ): Promise<User[] | null> {
    return sequelize.transaction().then((t) => {
      return User.findAll({ ...query, transaction: t });
    });
  }
}
