import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppProviderCtx } from "../../app-provider";
import { userServices } from "../../services";
import { User, paths } from "../../types";
import { TableWithPagination } from "../../ui";
import usePagination from "../../hooks/usePagination";
import { toast } from "../../lib/toast";

export const UserSearch = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();
  const {
    data: { user },
  } = useAppProviderCtx();
  const { pagination, setPagination, resetPage, onNextPage, onPreviousPage } =
    usePagination();
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500);

  useEffect(() => {
    resetPage();
  }, [keyword]);

  const { isLoading, data } = useQuery({
    queryKey: ["userSearch", pagination.page, debouncedSearchKeyword],
    queryFn: () =>
      userServices
        .getUsers({
          page: pagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { users, ...pagination } = res.result;
            setPagination(pagination);
            return users;
          }
          return [];
        })
        .catch(() => {
          toast.error("Get users failed");
          return [];
        }),
  });

  const onViewDetail = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.USER_DETAIL}/${id}`);
  };

  const onEdit = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.EDIT_USER}/${id}`);
  };

  const transformData = (data: Array<User>) => {
    if (!data) return [];
    return data.map((element) => [
      <p
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(element._id!)}
      >
        {element.email}
      </p>,
      moment(element.signupDate).format("MM/DD/YYYY"),
      moment(element.updatedAt).format("MM/DD/YYYY"),
      element.accountStatus,
      <span className="flex gap-2 justify-center items-center cursor-pointer">
        {user?.accountType! > 0 && (
          <IconEdit onClick={() => onEdit(element._id!)} />
        )}
      </span>,
    ]);
  };
  return (
    <div className="w-full h-full px-14 mt-5">
      <TableWithPagination
        head={["Description", "Sign-Up Date", "Last Login", "Status", "Admin"]}
        body={transformData(data)}
        pagination={pagination}
        loading={isLoading}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </div>
  );
};
