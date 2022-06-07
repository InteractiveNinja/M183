export interface DaoInterface<T, D> {
  create: (toCreate: D) => Promise<void>;
  findAll: () => Promise<T[]>;
  findById: (id: number | string) => Promise<T | null>;
}
