import { Button, LoadingOverlay, Table } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppProviderCtx } from "../../app-provider";
import { userServices } from "../../services";
import { User, UserPagination, paths } from "../../types";
import { EmptyBoxMessage, PaginationButton } from "../../ui";

export const UserSearch = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();
  const {
    data: { user },
  } = useAppProviderCtx();
  const [users, setUsers] = useState<Array<User> | null>([]);
  const [userPagination, setUserPagination] = useState<UserPagination>({
    page: 1,
  });
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500);

  useEffect(() => {
    resetPage();
  }, [keyword]);

  const { isLoading } = useQuery({
    queryKey: ["userSearch", userPagination.page, debouncedSearchKeyword],
    queryFn: () =>
      userServices
        .getUsers({
          page: userPagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { users, ...pagination } = res.result;
            setUsers(users);
            setUserPagination(pagination);
            if (!res.result.users.length) setUsers(null);
            return res.result;
          }
          return null;
        }),
  });

  const resetPage = () => {
    setUserPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onNextPage = () => {
    if (userPagination?.maxPages && userPagination?.page) {
      setUserPagination((prev) => ({ ...prev, page: prev.page! + 1 }));
    }
  };

  const onPreviousPage = () => {
    if (userPagination?.page! > 1) {
      setUserPagination((prev) => ({ ...prev, page: prev.page! - 1 }));
    }
  };

  const onViewDetail = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.USER_DETAIL}/${id}`);
  };

  const onEdit = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.EDIT_USER}/${id}`);
  };

  const rows = useMemo(() => {
    if (isLoading) {
      return (
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm" }}
        />
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
        <Table.Td
          className="text-ellipsis cursor-pointer"
          onClick={() => onViewDetail(element._id!)}
        >
          {element.email}
        </Table.Td>
        <Table.Td className="text-center">
          {moment(element.signupDate).format("MM/DD/YYYY")}
        </Table.Td>
        <Table.Td className="text-center">
          {moment(element.updatedAt).format("MM/DD/YYYY")}
        </Table.Td>
        <Table.Td className="text-center">{element.accountStatus}</Table.Td>
        <Table.Td className="flex gap-2 justify-center items-center cursor-pointer">
          {user?.accountType! > 0 && (
            <IconEdit onClick={() => onEdit(element._id!)} />
          )}
          {/* {user?.accountType! > 1 && <IconTrash />} */}
        </Table.Td>
      </Table.Tr>
    ));
  }, [isLoading, users]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full px-14 mt-5">
        <Table withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Description</Table.Th>
              <Table.Th className="text-center">Sign-Up Date</Table.Th>
              <Table.Th className="text-center">Last Login</Table.Th>
              <Table.Th className="text-center">Status</Table.Th>
              <Table.Th className="text-center">Admin</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <PaginationButton
          pagination={userPagination}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
    </div>
  );
};
