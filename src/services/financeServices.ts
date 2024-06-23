import { ResponseWrapper } from "../types";
import { WithdrawRequestStatus } from "../types/enums/WithdrawRequestStatus";
import { buildQueryParams } from "../utils";
import { API } from "./api";

class FinanceService extends API {
  async getWithdrawRequest({
    page = 1,
    withdrawRequestStatus,
  }: {
    page?: number;
    withdrawRequestStatus?: WithdrawRequestStatus | undefined;
  }): Promise<ResponseWrapper> {
    const url =
      "walletAdmin/request?" +
      buildQueryParams({ page, requestStatus: withdrawRequestStatus });
    return this.getAPI(url);
  }

  async updateWithdrawRequestStatus(payload: {
    withdrawRequestId: string;
    approve: boolean;
  }) {
    const url = `walletAdmin/withdraw-approve-deny`;
    return this.postAPI(url, payload);
  }

  async getAllUserBalance() {
    const url = `walletAdmin/balance/all`;
    return this.getAPI(url);
  }

  async getSingleUserBalance({ customerId }: { customerId: string }) {
    const url = `walletAdmin/user/${customerId}`;
    return this.getAPI(url);
  }
}

const financeService = new FinanceService();

export default financeService;
