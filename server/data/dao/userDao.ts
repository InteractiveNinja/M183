import { DaoInterface } from './dao.interface';
import { User } from '../models/user';
import { Bill } from '../models/bill';
import { Attributes, FindOptions, Model } from 'sequelize';

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

export class UserDao implements DaoInterface<User, UserDefinition> {
  create(user: UserDefinition): Promise<void> {
    return User.create({ ...user }).then();
  }

  findAll(): Promise<User[]> {
    return User.findAll({ include: Bill }).then((users) => users);
  }

  findById(id: number | string): Promise<User | null> {
    return User.findByPk(id, { include: Bill });
  }

  destroy(id: number | string): Promise<void> {
    return User.findByPk(id).then((user) => {
      if (user) {
        return user.destroy();
      }
      return Promise.reject();
    });
  }

  findOneBy(query: FindOptions<Attributes<User>>): Promise<User | null> {
    return User.findOne(query);
  }

  update(toUpdate: UserDefinition): Promise<void> {
    const { id } = toUpdate;
    return User.findByPk(id).then((user) =>
      user?.update({ ...user, ...toUpdate }).then()
    );
  }

  findeAllBy(
    query: FindOptions<Attributes<Model<User>>>
  ): Promise<User[] | null> {
    return User.findAll(query);
  }
}
