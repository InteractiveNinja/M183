import { DaoInterface } from './dao.interface';
import { Bill } from '../models/bill';
import {Attributes, Model, NonNullFindOptions} from "sequelize";

export interface BillDefinition {
  id?: number;
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

  destroy(id: number | string): Promise<void> {
    return Bill.findByPk(id).then((user) => {
      if (user) {
        return user.destroy();
      }
      return Promise.reject();
    });
  }

  update(toUpdate: BillDefinition): Promise<void> {
    const { id } = toUpdate;
    console.log(`updating ${id}`);
    return Bill.findByPk(id).then((bill) =>
      bill?.update({ ...bill, ...toUpdate }).then()
    );
  }

  findBy(query: NonNullFindOptions<Attributes<Model<Bill>>>): Promise<Bill | null> {
    return Bill.findOne(query);
  }


}
