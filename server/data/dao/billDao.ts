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
  async create(toCreate: BillDefinition): Promise<void> {
    return await sequelize.transaction(async (t) => {
      return await Bill.create({ ...toCreate }, { transaction: t }).then();
    });
  }

  async findAll(): Promise<Bill[]> {
    return await sequelize.transaction(async (t) => {
      return await Bill.findAll({ transaction: t }).then((bills) => bills);
    });
  }

  async findById(id: number | string): Promise<Bill | null> {
    return await sequelize.transaction(async (t) => {
      return await Bill.findByPk(id, { transaction: t });
    });
  }

  async destroy(id: number | string): Promise<void> {
    return await sequelize.transaction(async (t) => {
      return await Bill.findByPk(id, { transaction: t }).then((user) => {
        if (user) {
          return user.destroy();
        }
        return Promise.reject();
      });
    });
  }

  async update(toUpdate: BillDefinition): Promise<void> {
    const { id } = toUpdate;
    return await sequelize.transaction(async (t) => {
      return await Bill.findByPk(id, { transaction: t }).then((bill) =>
        bill?.update({ ...bill, ...toUpdate }).then()
      );
    });
  }

  async findOneBy(
    query: FindOptions<Attributes<Model<Bill>>>
  ): Promise<Bill | null> {
    return await sequelize.transaction(async (t) => {
      return await Bill.findOne({ ...query, transaction: t });
    });
  }

  async findeAllBy(
    query: FindOptions<Attributes<Model<Bill>>>
  ): Promise<Bill[] | null> {
    return await sequelize.transaction(async (t) => {
      return await Bill.findAll({ ...query, transaction: t });
    });
  }
}
