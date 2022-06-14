import { DaoInterface } from './dao.interface';
import { Bill } from '../models/bill';
import {Attributes, FindOptions, Model, NonNullFindOptions} from "sequelize";

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
    return Bill.findByPk(id).then((bill) =>
      bill?.update({ ...bill, ...toUpdate }).then()
    );
  }

  findOneBy(query: FindOptions<Attributes<Model<Bill>>>): Promise<Bill | null> {
    return Bill.findOne(query);
  }

  findeAllBy(query: FindOptions<Attributes<Model<Bill>>>): Promise<Bill[] | null> {
    return Bill.findAll(query);
  }


}
