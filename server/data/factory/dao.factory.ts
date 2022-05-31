import { UserDao } from '../dao/user.dao';

export class DaoFactory {
  private static instance: DaoFactory;
  private userDao: UserDao | undefined;
  private constructor() {}

  public static getInstance(): DaoFactory {
    if (!this.instance) {
      this.instance = new DaoFactory();
    }
    return this.instance;
  }

  public createUserDao() {
    if (!this.userDao) {
      this.userDao = new UserDao();
    }
    return this.userDao;
  }
}
