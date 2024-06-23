import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { financeService } from "../../../services";
import { IconChevronLeft } from "@tabler/icons-react";
import { InformationField } from "../../../ui";
import { UserBalance } from "../../../types";
import { formatAmount } from "../../../utils/formatAmount";

const UserBalanceDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userBalance, setUserBalance] = useState<UserBalance>();

  useQuery({
    queryKey: [id],
    queryFn: () =>
      financeService.getSingleUserBalance(id!).then((res) => {
        if (res.result) {
          setUserBalance(res.result);
          return res.result;
        }
        return null;
      }),
  });

  const onBack = () => navigate(-1);

  if (!userBalance) return null;
  return (
    <div className="w-full flex justify-center items-center mt-10 pb-[100px]">
      <div className="w-full px-16">
        <p
          className="flex text-lg items-center w-full justify-end text-purple-500 cursor-pointer "
          onClick={() => onBack()}
        >
          <IconChevronLeft /> Back to list
        </p>

        <InformationField
          label="Customer Id: "
          value={userBalance.customerId ? userBalance!.customerId : ""}
        />

        <InformationField
          label="Customer Name: "
          value={userBalance.customerName ? userBalance!.customerName : ""}
        />

        <InformationField
          label="Amount:"
          value={userBalance.amount ? formatAmount(userBalance.amount) : ""}
        />

        <InformationField
          label="Balance Id:"
          value={userBalance.balanceId ? userBalance.balanceId : ""}
        />
      </div>
    </div>
  );
};

export default UserBalanceDetailPage;
