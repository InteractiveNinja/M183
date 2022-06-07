import { DaoInterface } from './dao.interface';
import { Bill } from '../models/bill';

export interface BillDefinition {
  amount: number;
  deadline: Date;
  UserId: number;
}
export class BillDao implements DaoInterface<Bill, BillDefinition> {
  create(toCreate: BillDefinition): Promise<void> {
    return Bill.create({ ...toCreate }).then();
  }

  findAll(): Promise<Bill[]> {
    return Bill.findAll().then((bills) => bills);
  }

  findById(id: number | string): Promise<Bill | null> {
    return Bill.findByPk(id);
  }
}
