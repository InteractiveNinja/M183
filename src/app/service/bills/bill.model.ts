export interface BillModel {
  id: number;
  amount: number;
  deadline: Date;
  payed: boolean;
  createdAt: Date;
  updatedAt: Date;
  UserId: number;
}
