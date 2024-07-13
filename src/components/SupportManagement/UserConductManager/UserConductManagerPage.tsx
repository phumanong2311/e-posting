import { Select } from "@mantine/core";
import { WithdrawRequestStatus } from "../../../types/enums/WithdrawRequestStatus";
import { useState } from "react";

const UserConductManagerPage = () => {
  const options = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Pending",
      value: WithdrawRequestStatus.PENDING,
    },
    {
      label: "Approved",
      value: WithdrawRequestStatus.APPROVED,
    },
    {
      label: "Declined",
      value: WithdrawRequestStatus.DECLINED,
    },
  ];

  const [withdrawFilter, setWithdrawFilter] = useState(options[0].value);

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
        value={withdrawFilter}
        onChange={(value) => setWithdrawFilter(value!)}
      />

      {/* <WithdrawList withdrawFilter={withdrawFilter} /> */}
      <div>Here is a list</div>
    </div>
  );
};
export default UserConductManagerPage;
