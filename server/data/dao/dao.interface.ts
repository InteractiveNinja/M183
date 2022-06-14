import {Attributes, FindOptions, Model, NonNullFindOptions} from "sequelize";

export interface DaoInterface<T, D> {
  create: (toCreate: D) => Promise<void>;
  findAll: () => Promise<T[]>;
  findById: (id: number | string) => Promise<T | null>;
  update: (toUpdate: D) => Promise<void>;
  destroy: (id: number | string) => Promise<void>;
  findOneBy: (query: FindOptions<Attributes<Model<T>>>)=> Promise<T | null>
  findeAllBy: (query: FindOptions<Attributes<Model<T>>>)=> Promise<T[] | null>
}
