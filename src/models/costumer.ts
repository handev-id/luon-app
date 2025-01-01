export interface AppModel {
  appName: string;
  appWarning: string;
}

export interface CostumerModel {
  id: number;
  name: string;
  amount: number;
  bankName: string;
  startAt: string;
  endAt: string;
  //   accountName: string;
  accountNumber: string;
  paymentDate: string;
  duration: number;
  installment: number;
}
