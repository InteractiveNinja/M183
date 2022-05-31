import { DaoInterface } from './dao.interface';
import { User } from '../models/user';

export interface UserDefinition {
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
  create(user: UserDefinition): Promise<boolean> {
    return User.create({ ...user })
      .then(() => true)
      .catch(() => {
        return false;
      });
  }

  findAll(): Promise<User[]> {
    return User.findAll().then((users) => users);
  }

  findById(id: number): Promise<User | null> {
    return User.findByPk(id);
  }
}
