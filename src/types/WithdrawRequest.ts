import { WithdrawRequestStatus } from "./enums/WithdrawRequestStatus";

export type WithdrawRequest = {
  customerId: string;
  transactionId: string;
  amount: number;
  requestStatus: WithdrawRequestStatus;
  withdrawRequestId: string;
};
