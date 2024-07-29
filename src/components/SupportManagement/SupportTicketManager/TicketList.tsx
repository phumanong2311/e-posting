import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePagination from "../../../hooks/usePagination";
import { toast } from "../../../lib/toast";
import { supportManagementServices } from "../../../services";
import { paths } from "../../../types";
import {
  SupportTicketStatus,
  TicketPriorityLevel,
  TicketProcessStatus,
} from "../../../types/enums/SupportTicketStatus";
import { SupportTicket } from "../../../types/SupportTicket";
import { TableWithPagination } from "../../../ui";

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

  const mapperPriorityLevel = (priorityLevel: number) => {
    switch (priorityLevel) {
      case 0:
        return TicketPriorityLevel.LOW;
      case 1:
        return TicketPriorityLevel.MEDIUM;
      case 2:
        return TicketPriorityLevel.HIGH;
      case 3:
        return TicketPriorityLevel.CRITICAL;
      default:
        return TicketPriorityLevel.LOW;
    }
  };

  const transformData = (data: Array<SupportTicket>) => {
    if (!data) return [];
    return data.map((element) => [
      <p
        className="text-ellipsis cursor-pointer capitalize"
        onClick={() => goToDetail(element.supportTicketId!)}
      >
        {element.mainTopic}
      </p>,
      <p className="capitalize">{element.subTopic}</p>,
      <p className="capitalize">{element.firstName}</p>,
      <p className="capitalize">{element.lastName}</p>,
      element.email,
      moment(element.createdAt).format("MM/DD/YYYY hh:mm A"),
      <p className="capitalize">{element.ticketProcessStatus}</p>,
      <p className="capitalize">
        {element.priorityLevel !== undefined
          ? mapperPriorityLevel(element.priorityLevel)
          : ""}
      </p>,
    ]);
  };
  return (
    <div className="w-full h-full px-14 mt-2">
      <TableWithPagination
        head={[
          "Contact Reason",
          "Sub Topic",
          "First Name",
          "Last Name",
          "Email",
          "Date Submitted",
          "Status",
          "Priority",
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
