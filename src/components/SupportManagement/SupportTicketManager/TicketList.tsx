import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "../../../lib/toast";
import { supportManagementServices } from "../../../services";
import { TableWithPagination } from "../../../ui";
import {
  SupportTicketStatus,
  TicketPriorityLevel,
  TicketProcessStatus,
} from "../../../types/enums/SupportTicketStatus";
import { SupportTicket } from "../../../types/SupportTicket";
import { paths } from "../../../types";
import { useNavigate } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";

const TicketList = ({
  ticketStatusFilter,
  contactReason,
  processStatus,
  priorityLevel,
}: {
  ticketStatusFilter: SupportTicketStatus;
  contactReason: string;
  processStatus: TicketProcessStatus | string;
  priorityLevel: TicketPriorityLevel | string;
}) => {
  const navigate = useNavigate();
  const { pagination, setPagination, resetPage, onNextPage, onPreviousPage } =
    usePagination();
  useEffect(() => {
    resetPage();
  }, [ticketStatusFilter]);

  const { isLoading, data } = useQuery({
    staleTime: 0,
    queryKey: [
      "supportTicketList",
      pagination.page,
      ticketStatusFilter,
      contactReason,
      processStatus,
      priorityLevel,
    ],
    queryFn: () =>
      supportManagementServices
        .getSupportTickets({
          page: pagination?.page,
          supportTicketStatus: ticketStatusFilter,
          mainTopic: contactReason,
          ticketProcessStatus: processStatus,
          priorityLevel: priorityLevel,
        })
        .then((res) => {
          if (res.result) {
            const { supportTickets, ...pagination } = res.result;
            setPagination(pagination);
            return supportTickets;
          }
          return [];
        })
        .catch(() => {
          toast.error("Failed to get support tickets");
          return [];
        }),
  });

  const goToDetail = (id: string) => {
    navigate(
      `/${paths.ROOT}/${paths.SUPPORT_MANAGEMENT}/${paths.SUPPORT_TICKET_MANAGER}/${id}`
    );
  };

  const transformData = (data: Array<SupportTicket>) => {
    if (!data) return [];
    return data.map((element) => [
      <p
        className="text-ellipsis cursor-pointer"
        onClick={() => goToDetail(element.supportTicketId!)}
      >
        {element.mainTopic}
      </p>,
      element.subTopic,
      element.priorityLevel,
      element.ticketProcessStatus,
      element.supportTicketStatus,
    ]);
  };
  return (
    <div className="w-full h-full px-14 mt-2">
      <TableWithPagination
        head={[
          "Contact Reason",
          "Sub Topic",
          "Priority Level",
          "Process Status",
          "Ticket Status",
        ]}
        body={transformData(data)}
        pagination={pagination}
        loading={isLoading}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </div>
  );
};

export default TicketList;
