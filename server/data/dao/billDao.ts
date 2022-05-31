import { DaoInterface } from './dao.interface';
import { Bill } from '../models/bill';

export interface BillDefinition {
  amount: number;
  deadline: Date;
}
export class BillDao implements DaoInterface<Bill, BillDefinition> {
  create(toCreate: BillDefinition): Promise<boolean> {
    return Bill.create({ ...toCreate })
      .then(() => true)
      .catch(() => false);
  }

  findAll(): Promise<Bill[]> {
    return Bill.findAll().then((bills) => bills);
  }

  findById(id: number): Promise<Bill | null> {
    return Bill.findByPk(id);
  }
}
