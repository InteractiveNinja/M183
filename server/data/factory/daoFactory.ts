import { UserDao } from '../dao/userDao';
import { BillDao } from '../dao/billDao';

export class DaoFactory {
  private static instance: DaoFactory;
  private userDao: UserDao | undefined;
  private billDao: BillDao | undefined;

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

  public createBillDao() {
    if (!this.billDao) {
      this.billDao = new BillDao();
    }
    return this.billDao;
  }
}
