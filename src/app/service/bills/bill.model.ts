export interface BillModel {
  id?: number;
  amount: number;
  deadline: Date;
  paid: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  UserId: number;
}
