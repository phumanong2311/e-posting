import { Table, LoadingOverlay } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { UserBalance } from "../../../types";
import { financeService } from "../../../services";
import { EmptyBoxMessage } from "../../../ui";
import { formatAmount } from "../../../utils/formatAmount";

const UserBalanceList = () => {
  const [userBalances, setUserBalances] = useState<Array<UserBalance> | null>(
    []
  );

  const { isLoading } = useQuery({
    staleTime: 0,
    queryKey: ["userBalanceList"],
    queryFn: () =>
      financeService.getAllUserBalance().then((res) => {
        if (res.result) {
          const userBalances = res.result;
          setUserBalances(userBalances);
          if (!res.result.length) setUserBalances(null);
          return res.result;
        }
        return null;
      }),
  });

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

    if (userBalances === null) {
      return (
        <tr>
          <td colSpan={4}>
            <EmptyBoxMessage className="h-60" />
          </td>
        </tr>
      );
    }

    return userBalances.map((element, index) => (
      <Table.Tr key={index}>
        <Table.Td className="text-ellipsis cursor-pointer">
          {element.customerId}
        </Table.Td>
        <Table.Td>{element.customerName}</Table.Td>
        <Table.Td>{formatAmount(element.amount)}</Table.Td>
        <Table.Td>{element.balanceId}</Table.Td>
      </Table.Tr>
    ));
  }, [userBalances, isLoading]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full px-14 mt-2">
        <Table withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Customer Id</Table.Th>
              <Table.Th>Customer Name</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Balance Id</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default UserBalanceList;
