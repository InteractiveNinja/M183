export interface DaoInterface<T, D> {
  create: (toCreate: D) => Promise<boolean>;
  findAll: () => Promise<T[]>;
  findById: (id: number) => Promise<T | null>;
}
