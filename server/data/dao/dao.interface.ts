import { Attributes, FindOptions, Model } from 'sequelize';

export interface DaoInterface<T, D> {
  create: (toCreate: D) => Promise<void>;
  findAll: () => Promise<T[]>;
  findById: (id: number | string) => Promise<T | null>;
  update: (toUpdate: D) => Promise<number>;
  destroy: (id: number | string) => Promise<void>;
  findOneBy: (query: FindOptions<Attributes<Model<T>>>) => Promise<T | null>;
  findeAllBy: (query: FindOptions<Attributes<Model<T>>>) => Promise<T[] | null>;
}
