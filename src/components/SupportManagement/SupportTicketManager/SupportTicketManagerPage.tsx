import { Select } from "@mantine/core";
import { useState } from "react";
import { SupportTicketStatus } from "../../../types/enums/SupportTicketStatus";
import TicketList from "./TicketList";

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

  const [ticketStatusFilter, setTicketStatusFilter] = useState(
    options[0].value
  );

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
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

      <TicketList ticketStatusFilter={ticketStatusFilter} />
    </div>
  );
};
export default SupportTicketManagerPage;
