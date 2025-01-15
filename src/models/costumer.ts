export interface AppModel {
  name: string;
  warning: {
    title: string;
    description: string;
    status: "success" | "fail";
  };
  announcement: string;
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
  insuranceNumber: string;
}
