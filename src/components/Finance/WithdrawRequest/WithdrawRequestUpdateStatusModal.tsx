import { IconEdit } from "@tabler/icons-react";
import ConfirmModal from "../../../ui/ConfirmModal";
import { Select } from "@mantine/core";
import { WithdrawRequestStatus } from "../../../types/enums/WithdrawRequestStatus";
import { useState } from "react";

const WithdrawRequestUpdateStatusModal = ({
  currentStatus,
  handleUpdateStatus,
  withdrawRequestId,
}: {
  withdrawRequestId: string;
  currentStatus: WithdrawRequestStatus;
  handleUpdateStatus: Function;
}) => {
  const [withdrawStatus, setWithdrawStatus] =
    useState<WithdrawRequestStatus>(currentStatus);

  return (
    <ConfirmModal
      trigger={<IconEdit color="black" />}
      title="Update request's status"
      children={
        <Select
          placeholder="Filters"
          className="mt-6 w-full"
          data={[
            {
              value: WithdrawRequestStatus.APPROVED,
              label: "Approved",
            },
            {
              value: WithdrawRequestStatus.DECLINED,
              label: "Declined",
            },
          ]}
          value={withdrawStatus}
          onChange={(value) =>
            setWithdrawStatus(value as WithdrawRequestStatus)
          }
        />
      }
      onConfirm={() => handleUpdateStatus(withdrawRequestId, withdrawStatus)}
    />
  );
};

export default WithdrawRequestUpdateStatusModal;
