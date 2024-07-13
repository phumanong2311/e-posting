import { Button, LoadingOverlay, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "../../../lib/toast";
import { financeService } from "../../../services";
import { WithdrawRequest, WithdrawRequestPagination } from "../../../types";
import { WithdrawRequestStatus } from "../../../types/enums/WithdrawRequestStatus";
import { EmptyBoxMessage, PaginationButton } from "../../../ui";
import { formatAmount } from "../../../utils/formatAmount";
import WithdrawRequestUpdateStatusModal from "./WithdrawRequestUpdateStatusModal";

const WithdrawList = ({ withdrawFilter }: { withdrawFilter: string }) => {
  const [withdrawRequests, setWithdrawRequests] =
    useState<Array<WithdrawRequest> | null>([]);
  const [withdrawRequestPagination, setWithdrawRequestPagination] =
    useState<WithdrawRequestPagination>({
      page: 1,
    });

  useEffect(() => {
    resetPage();
  }, [withdrawFilter]);

  const { isLoading, refetch } = useQuery({
    staleTime: 0,
    queryKey: ["withdrawList", withdrawRequestPagination.page, withdrawFilter],
    queryFn: () =>
      financeService
        .getWithdrawRequest({
          page: withdrawRequestPagination?.page,
          withdrawRequestStatus:
            (withdrawFilter as WithdrawRequestStatus) || undefined,
        })
        .then((res) => {
          if (res.result) {
            const { requests, ...pagination } = res.result;
            setWithdrawRequests(requests);
            setWithdrawRequestPagination(pagination);
            if (!res.result.requests.length) setWithdrawRequests(null);
            return res.result;
          }
          return null;
        }),
  });

  const resetPage = () => {
    setWithdrawRequestPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onNextPage = () => {
    if (
      withdrawRequestPagination?.maxPages &&
      withdrawRequestPagination?.page
    ) {
      setWithdrawRequestPagination((prev) => ({
        ...prev,
        page: prev.page! + 1,
      }));
    }
  };

  const onPreviousPage = () => {
    if (withdrawRequestPagination?.page! > 1) {
      setWithdrawRequestPagination((prev) => ({
        ...prev,
        page: prev.page! - 1,
      }));
    }
  };

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

  const rows = useMemo(() => {
    if (isLoading) {
      return (
        <Table.Tr>
          <Table.Td></Table.Td>
          <Table.Td className="text-center">
            <LoadingOverlay
              visible={isLoading}
              zIndex={1000}
              overlayProps={{ radius: "sm" }}
            />
          </Table.Td>
          <Table.Td></Table.Td>
        </Table.Tr>
      );
    }

    if (withdrawRequests === null) {
      return (
        <tr>
          <td colSpan={5}>
            <EmptyBoxMessage className="h-60" />
          </td>
        </tr>
      );
    }

    return withdrawRequests.map((element, index) => (
      <Table.Tr key={index}>
        <Table.Td className="text-ellipsis">{element.customerId}</Table.Td>
        <Table.Td>{element.transactionId}</Table.Td>
        <Table.Td>{formatAmount(element.amount)}</Table.Td>
        <Table.Td>{element.requestStatus}</Table.Td>
        {element.requestStatus === WithdrawRequestStatus.PENDING && (
          <Table.Td>
            <WithdrawRequestUpdateStatusModal
              currentStatus={element.requestStatus}
              withdrawRequestId={element.withdrawRequestId}
              handleUpdateStatus={handleUpdateWithdrawRequestStatus}
            />
          </Table.Td>
        )}
      </Table.Tr>
    ));
  }, [withdrawRequests, isLoading]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full px-14 mt-2">
        <Table withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Customer Id</Table.Th>
              <Table.Th>Transaction Id</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <PaginationButton
          pagination={withdrawRequestPagination}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
    </div>
  );
};

export default WithdrawList;
