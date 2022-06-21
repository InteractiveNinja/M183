import { DaoInterface } from './dao.interface';
import { Bill } from '../models/bill';
import { Attributes, FindOptions, Model } from 'sequelize';
import { SequelizeFactory } from '../factory/sequelizeFactory';

export interface BillDefinition {
  id?: number;
  amount: number;
  deadline: Date;
  UserId: number;
}

const sequelize = SequelizeFactory.getInstance().getSequelize();

export class BillDao implements DaoInterface<Bill, BillDefinition> {
  create(toCreate: BillDefinition): Promise<void> {
    return sequelize.transaction().then((t) => {
      return Bill.create({ ...toCreate }, { transaction: t }).then();
    });
  }

  findAll(): Promise<Bill[]> {
    return sequelize.transaction().then((t) => {
      return Bill.findAll({ transaction: t }).then((bills) => bills);
    });
  }

  findById(id: number | string): Promise<Bill | null> {
    return sequelize.transaction().then((t) => {
      return Bill.findByPk(id, { transaction: t });
    });
  }

  destroy(id: number | string): Promise<void> {
    return sequelize.transaction().then((t) => {
      return Bill.findByPk(id, { transaction: t }).then((user) => {
        if (user) {
          return user.destroy();
        }
        return Promise.reject();
      });
    });
  }

  update(toUpdate: BillDefinition): Promise<void> {
    const { id } = toUpdate;
    return sequelize.transaction().then((t) => {
      return Bill.findByPk(id, { transaction: t }).then((bill) =>
        bill?.update({ ...bill, ...toUpdate }).then()
      );
    });
  }

  findOneBy(query: FindOptions<Attributes<Model<Bill>>>): Promise<Bill | null> {
    return sequelize.transaction().then((t) => {
      return Bill.findOne({ ...query, transaction: t });
    });
  }

  findeAllBy(
    query: FindOptions<Attributes<Model<Bill>>>
  ): Promise<Bill[] | null> {
    return sequelize.transaction().then((t) => {
      return Bill.findAll({ ...query, transaction: t });
    });
  }
}
