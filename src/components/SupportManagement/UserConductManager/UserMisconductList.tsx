import { LoadingOverlay, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "../../../lib/toast";
import { supportManagementServices } from "../../../services";
import { EmptyBoxMessage, PaginationButton } from "../../../ui";
import { UserMisconduct } from "../../../types";
import { Pagination } from "../../../types/Pagination";
import UpdateUserMisconductModal from "./UpdateUserMisconductModal";

const UserMisconductList = ({
  searchType,
  searchKeyword,
}: {
  searchType: string;
  searchKeyword: string;
}) => {
  const [users, setUsers] = useState<Array<UserMisconduct> | null>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
  });

  useEffect(() => {
    resetPage();
  }, [searchType, searchKeyword]);

  const { isLoading } = useQuery({
    staleTime: 0,
    queryKey: ["userMisconduct", pagination.page, searchType, searchKeyword],
    queryFn: () =>
      supportManagementServices
        .getUserMisconducts({
          page: pagination?.page,
          userId: searchType === "userId" ? searchKeyword : undefined,
          keyword: searchType === "username" ? searchKeyword : undefined,
        })
        .then((res) => {
          if (res.result) {
            const { users, ...pagination } = res.result;
            setUsers(users);
            setPagination(pagination);
            if (!users.length) setUsers(null);
            return res.result;
          }
          return null;
        })
        .catch(() => {
          toast.error("Failed to get user misconducts");
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

  const handleUpdate = (
    misconductId: string,
    userName: string,
    numberOfReports: number
  ) => {
    supportManagementServices
      .updateUserMisconduct({
        misconductId,
        userName,
        numberOfReports,
      })
      .then((result) => {
        result && toast.success("Update misconduct successfully");
      })
      .catch(() => {
        toast.error("Update misconduct failed");
      });
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

    if (users === null) {
      return (
        <tr>
          <td colSpan={4}>
            <EmptyBoxMessage className="h-60" />
          </td>
        </tr>
      );
    }

    return users.map((element, index) => (
      <Table.Tr key={index}>
        <Table.Td>{element.userId}</Table.Td>
        <Table.Td className="text-ellipsis">{element.userName}</Table.Td>
        <Table.Td>{element.numberOfReports}</Table.Td>
        <Table.Td>
          <UpdateUserMisconductModal
            misconductId={element.userMisconductId!}
            currentUserName={element.userName!}
            currentNumberOfReports={element.numberOfReports!}
            handleUpdate={handleUpdate}
          />
        </Table.Td>
      </Table.Tr>
    ));
  }, [users, isLoading]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full px-14 mt-2">
        <Table withRowBorders={true} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User Id</Table.Th>
              <Table.Th>User Name</Table.Th>
              <Table.Th>Number of Reports</Table.Th>
              <Table.Th>Action</Table.Th>
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

export default UserMisconductList;
