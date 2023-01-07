import { Attributes, FindOptions, Model } from 'sequelize';
import { Logger } from '../../util/logger';
import { SequelizeFactory } from '../factory/sequelizeFactory';
import { Bill } from '../models/bill';
import { DaoInterface } from './dao.interface';

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
      await Bill.create({ ...toCreate }, { transaction: t }).catch(() => {
        Logger.error('failed to create bill');
        return Promise.reject();
      });
    });
  }

  async findAll(): Promise<Bill[]> {
    return await sequelize.transaction(async (t) => {
      return await Bill.findAll({ transaction: t })
        .then((bills) => bills)
        .catch(() => {
          Logger.error('failed to fetch bills');
          return Promise.reject();
        });
    });
  }

  async findById(id: number | string): Promise<Bill | null> {
    return await sequelize.transaction(async (t) => {
      return await Bill.findByPk(id, { transaction: t }).catch(() => {
        Logger.error(`failed to fetch bill by id with given id: ${id}`);
        return Promise.reject();
      });
    });
  }

  async destroy(id: number | string): Promise<void> {
    return await sequelize.transaction(async (t) => {
      return await Bill.findByPk(id, { transaction: t })
        .then((user) => {
          if (user) {
            return user.destroy();
          }
          return Promise.reject();
        })
        .catch(() => {
          Logger.error(`failed to delete bill by id with given id: ${id}`);
          return Promise.reject();
        });
    });
  }

  async update(toUpdate: BillDefinition): Promise<number> {
    const { id } = toUpdate;
    return await sequelize
      .transaction(async (t) => {
        let promise = await Bill.update(
          { ...toUpdate },
          { where: { id }, transaction: t }
        );
        return promise[0];
      })
      .catch(() => {
        Logger.error('failed to update bill');
        return Promise.reject();
      });
  }

  async findOneBy(
    query: FindOptions<Attributes<Model<Bill>>>
  ): Promise<Bill | null> {
    return await sequelize
      .transaction(async (t) => {
        return await Bill.findOne({ ...query, transaction: t });
      })
      .catch(() => {
        Logger.error('failed to find single bill with find options');
        return Promise.reject();
      });
  }

  async findeAllBy(
    query: FindOptions<Attributes<Model<Bill>>>
  ): Promise<Bill[] | null> {
    return await sequelize
      .transaction(async (t) => {
        return await Bill.findAll({ ...query, transaction: t });
      })
      .catch(() => {
        Logger.error('failed to find all bills with find options');
        return Promise.reject();
      });
  }
}
