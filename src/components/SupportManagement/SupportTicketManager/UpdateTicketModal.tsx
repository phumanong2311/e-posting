import { IconPencil } from "@tabler/icons-react";
import ConfirmModal from "../../../ui/ConfirmModal";
import { Button, Select } from "@mantine/core";
import { useState } from "react";

const UpdateTicketModal = ({
  currentStatus,
  handleUpdateStatus,
  supportTicketId,
  currentPriorityLevel,
}: {
  supportTicketId: string;
  currentStatus: number;
  currentPriorityLevel: number;
  handleUpdateStatus: Function;
}) => {
  const [ticketStatus, setTicketStatus] = useState(currentStatus);
  const [priorityLevel, setPriorityLevel] = useState(currentPriorityLevel);

  const renderChildren = () => {
    return (
      <>
        <Select
          placeholder="Priority level"
          className="mt-6 w-full"
          data={[
            {
              value: "1",
              label: "Low",
            },
            {
              value: "2",
              label: "Medium",
            },
            {
              value: "3",
              label: "High",
            },
          ]}
          value={priorityLevel.toString()}
          onChange={(value) => setPriorityLevel(+value!)}
        />

        <Select
          placeholder="Status"
          className="mt-6 w-full"
          data={[
            {
              value: "1",
              label: "Open",
            },
            {
              value: "2",
              label: "Closed",
            },
          ]}
          value={ticketStatus.toString()}
          onChange={(value) => setTicketStatus(+value!)}
        />
      </>
    );
  };

  return (
    <ConfirmModal
      trigger={
        <Button
          variant="outline"
          leftSection={<IconPencil className="cursor-pointer" />}
          children="Edit"
          className="h-full"
        />
      }
      title="Update ticket's status"
      children={renderChildren()}
      onConfirm={() => handleUpdateStatus(supportTicketId, ticketStatus)}
    />
  );
};

export default UpdateTicketModal;
