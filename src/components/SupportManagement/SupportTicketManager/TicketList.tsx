import { LoadingOverlay, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "../../../lib/toast";
import { financeService, supportManagementServices } from "../../../services";
import { WithdrawRequestStatus } from "../../../types/enums/WithdrawRequestStatus";
import { EmptyBoxMessage, PaginationButton } from "../../../ui";
import { formatAmount } from "../../../utils/formatAmount";
import { SupportTicketStatus } from "../../../types/enums/SupportTicketStatus";
import { SupportTicket } from "../../../types/SupportTicket";
import { SupportTicketPagination } from "../../../types/SupportTicketPagination";

const TicketList = ({
  ticketStatusFilter,
}: {
  ticketStatusFilter: SupportTicketStatus;
}) => {
  const [tickets, setTickets] = useState<Array<SupportTicket> | null>([]);
  const [pagination, setPagination] = useState<SupportTicketPagination>({
    page: 1,
  });

  useEffect(() => {
    resetPage();
  }, [ticketStatusFilter]);

  const { isLoading, refetch } = useQuery({
    staleTime: 0,
    queryKey: ["supportTicketList", pagination.page, ticketStatusFilter],
    queryFn: () =>
      supportManagementServices
        .getSupportTickets({
          page: pagination?.page,
          supportTicketStatus: ticketStatusFilter,
        })
        .then((res) => {
          if (res.result) {
            const { requests, ...pagination } = res.result;
            setTickets(requests);
            setPagination(pagination);
            if (!res.result.requests.length) setTickets(null);
            return res.result;
          }
          return null;
        }),
  });

  const resetPage = () => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onNextPage = () => {
    if (pagination?.maxPages && pagination?.page) {
      setPagination((prev) => ({
        ...prev,
        page: prev.page! + 1,
      }));
    }
  };

  const onPreviousPage = () => {
    if (pagination?.page! > 1) {
      setPagination((prev) => ({
        ...prev,
        page: prev.page! - 1,
      }));
    }
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

    if (tickets === null) {
      return (
        <tr>
          <td colSpan={4}>
            <EmptyBoxMessage className="h-60" />
          </td>
        </tr>
      );
    }

    return tickets.map((element, index) => (
      <Table.Tr key={index}>
        <Table.Td className="text-ellipsis">{element.mainTopic}</Table.Td>
        <Table.Td>{element.subTopic}</Table.Td>
        <Table.Td>{element.priorityLevel}</Table.Td>
        <Table.Td>{element.ticketProcessStatus}</Table.Td>
      </Table.Tr>
    ));
  }, [tickets, isLoading]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full px-14 mt-2">
        <Table withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Contact Reason</Table.Th>
              <Table.Th>Sub Topic</Table.Th>
              <Table.Th>Priority Level</Table.Th>
              <Table.Th>Process Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <PaginationButton
          pagination={pagination}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
    </div>
  );
};

export default TicketList;
