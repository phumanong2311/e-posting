import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "../../../lib/toast";
import { supportManagementServices } from "../../../services";
import { TableWithPagination } from "../../../ui";
import { UserMisconduct } from "../../../types";
import UpdateUserMisconductModal from "./UpdateUserMisconductModal";
import usePagination from "../../../hooks/usePagination";

const UserMisconductList = ({
  searchType,
  searchKeyword,
}: {
  searchType: string;
  searchKeyword: string;
}) => {
  const { pagination, setPagination, resetPage, onNextPage, onPreviousPage } =
    usePagination();

  useEffect(() => {
    resetPage();
  }, [searchType, searchKeyword]);

  const { isLoading, data } = useQuery({
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
            setPagination(pagination);
            return users;
          }
          return [];
        })
        .catch(() => {
          toast.error("Failed to get user misconducts");
          return [];
        }),
  });

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

  const transformData = (data: Array<UserMisconduct>) => {
    if (!data) return [];
    return data.map((element) => [
      element.userId,
      element.userName,
      element.numberOfReports,
      <UpdateUserMisconductModal
        misconductId={element.userMisconductId!}
        currentUserName={element.userName!}
        currentNumberOfReports={element.numberOfReports!}
        handleUpdate={handleUpdate}
      />,
    ]);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-14 mt-2">
      <TableWithPagination
        head={["User Id", "User Name", "Number of Reports", "Action"]}
        body={transformData(data)}
        pagination={pagination}
        loading={isLoading}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </div>
  );
};

export default UserMisconductList;
