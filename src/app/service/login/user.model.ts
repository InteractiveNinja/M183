import { BillModel } from '../bills/bill.model';

export interface User {
  id?: number;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  gender: string;
  address: string;
  city: string;
  job: string;
  admin: boolean;
  Bills?: BillModel[];
  version?: number;
}
