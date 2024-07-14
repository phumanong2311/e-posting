import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "../../../lib/toast";
import { financeService } from "../../../services";
import { WithdrawRequest } from "../../../types";
import { WithdrawRequestStatus } from "../../../types/enums/WithdrawRequestStatus";
import { TableWithPagination } from "../../../ui";
import { formatAmount } from "../../../utils/formatAmount";
import WithdrawRequestUpdateStatusModal from "./WithdrawRequestUpdateStatusModal";
import usePagination from "../../../hooks/usePagination";

const WithdrawList = ({ withdrawFilter }: { withdrawFilter: string }) => {
  const { pagination, setPagination, resetPage, onNextPage, onPreviousPage } =
    usePagination();
  useEffect(() => {
    resetPage();
  }, [withdrawFilter]);

  const { isLoading, data, refetch } = useQuery({
    staleTime: 0,
    queryKey: ["withdrawList", pagination.page, withdrawFilter],
    queryFn: () =>
      financeService
        .getWithdrawRequest({
          page: pagination?.page,
          withdrawRequestStatus:
            (withdrawFilter as WithdrawRequestStatus) || undefined,
        })
        .then((res) => {
          if (res.result) {
            const { requests, ...pagination } = res.result;
            setPagination(pagination);
            return requests;
          }
          return [];
        })
        .catch(() => {
          toast.error("Get withdraw request failed");
          return [];
        }),
  });

  const handleUpdateWithdrawRequestStatus = (
    withdrawRequestId: string,
    status: WithdrawRequestStatus
  ) => {
    financeService
      .updateWithdrawRequestStatus({
        withdrawRequestId,
        approve: status === WithdrawRequestStatus.APPROVED,
      })
      .then((result) => {
        result && toast.success("Update status successfully");
        refetch();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const renderModal = (withdrawRequest: WithdrawRequest) => {
    return (
      withdrawRequest.requestStatus === WithdrawRequestStatus.PENDING && (
        <WithdrawRequestUpdateStatusModal
          currentStatus={withdrawRequest.requestStatus}
          withdrawRequestId={withdrawRequest.withdrawRequestId}
          handleUpdateStatus={handleUpdateWithdrawRequestStatus}
        />
      )
    );
  };

  const transformData = (data: any) => {
    if (!data) return [];
    return data.map((withdrawRequest: WithdrawRequest) => [
      withdrawRequest.customerId,
      withdrawRequest.transactionId,
      formatAmount(withdrawRequest.amount),
      withdrawRequest.requestStatus,
      renderModal(withdrawRequest),
    ]);
  };

  return (
    <div className="w-full h-full px-14 mt-2">
      <TableWithPagination
        head={["Customer Id", "Transaction Id", "Amount", "Status"]}
        body={transformData(data)}
        pagination={pagination}
        loading={isLoading}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </div>
  );
};

export default WithdrawList;
