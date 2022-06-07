import { DaoInterface } from './dao.interface';
import { User } from '../models/user';
import { Bill } from '../models/bill';

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
  create(user: UserDefinition): Promise<void> {
    return User.create({ ...user }).then();
  }

  findAll(): Promise<User[]> {
    return User.findAll().then((users) => users);
  }

  findById(id: number | string): Promise<User | null> {
    return User.findByPk(id, { include: Bill });
  }
}
