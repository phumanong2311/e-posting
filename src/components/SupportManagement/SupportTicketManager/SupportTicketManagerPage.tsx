import { Select } from "@mantine/core";
import { useState } from "react";
import {
  SupportTicketStatus,
  TicketPriorityLevel,
  TicketProcessStatus,
} from "../../../types/enums/SupportTicketStatus";
import TicketList from "./TicketList";
import { useQuery } from "@tanstack/react-query";
import { supportManagementServices } from "../../../services";

const SupportTicketManagerPage = () => {
  const options = [
    {
      label: "All",
      value: SupportTicketStatus.ALL,
    },
    {
      label: "Open",
      value: SupportTicketStatus.OPEN,
    },
    {
      label: "Closed",
      value: SupportTicketStatus.CLOSED,
    },
  ];

  const { data: contactReasons } = useQuery({
    staleTime: 0,
    queryKey: ["contactReasons"],
    queryFn: () =>
      supportManagementServices.getContactTopics().then((res) => {
        if (res.result) {
          const reasons = res.result.map(
            ({ mainTopic }: { mainTopic: string }) => ({
              label: mainTopic,
              value: mainTopic,
            })
          );
          reasons.unshift({
            label: "All",
            value: "",
          });
          return reasons;
        }
        return [];
      }),
  });

  const processStatusOptions = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Open",
      value: TicketProcessStatus.OPEN,
    },
    {
      label: "In Review",
      value: TicketProcessStatus.IN_REVIEW,
    },
    {
      label: "Canceled",
      value: TicketProcessStatus.CANCELED,
    },
    {
      label: "On Hold",
      value: TicketProcessStatus.ON_HOLD,
    },
    {
      label: "Resolved",
      value: TicketProcessStatus.RESOLVED,
    },
  ];

  const priorityLevelOptions = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Low",
      value: TicketPriorityLevel.LOW,
    },
    {
      label: "Medium",
      value: TicketPriorityLevel.MEDIUM,
    },
    {
      label: "High",
      value: TicketPriorityLevel.HIGH,
    },
    {
      label: "Critical",
      value: TicketPriorityLevel.CRITICAL,
    },
  ];

  const [ticketStatusFilter, setTicketStatusFilter] = useState(
    options[0].value
  );
  const [contactReasonFilter, setContactReasonFilter] = useState("");

  const [processStatusFilter, setProcessStatusFilter] = useState("");
  const [priorityLevelFilter, setPriorityLevelFilter] = useState("");

  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-2">
      <Select
        placeholder="Filters"
        radius={100}
        classNames={{
          input: "rounded",
        }}
        className="mt-0 w-[30%]"
        data={options}
        value={ticketStatusFilter}
        onChange={(value) =>
          setTicketStatusFilter(value as SupportTicketStatus)
        }
      />
      <div className="w-full flex justify-between items-center mt-3 gap-3 px-10">
        <Select
          placeholder="Contact Reason"
          radius={100}
          classNames={{
            input: "rounded",
          }}
          className="mt-0 w-[30%]"
          data={contactReasons}
          value={contactReasonFilter}
          onChange={(value) => setContactReasonFilter(value as string)}
        />

        <Select
          placeholder="Process Status"
          radius={100}
          classNames={{
            input: "rounded",
          }}
          className="mt-0 w-[30%]"
          data={processStatusOptions}
          value={processStatusFilter}
          onChange={(value) => setProcessStatusFilter(value as string)}
        />

        <Select
          placeholder="Priority Level"
          radius={100}
          classNames={{
            input: "rounded",
          }}
          className="mt-0 w-[30%]"
          data={priorityLevelOptions}
          value={priorityLevelFilter}
          onChange={(value) => setPriorityLevelFilter(value as string)}
        />
      </div>

      <TicketList
        ticketStatusFilter={ticketStatusFilter}
        contactReason={contactReasonFilter}
        processStatus={processStatusFilter}
        priorityLevel={priorityLevelFilter}
      />
    </div>
  );
};
export default SupportTicketManagerPage;
