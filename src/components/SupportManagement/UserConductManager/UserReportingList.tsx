import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { toast } from "../../../lib/toast";
import { supportManagementServices } from "../../../services";
import { TableWithPagination } from "../../../ui";
import { UserReport } from "../../../types";
import usePagination from "../../../hooks/usePagination";

const UserReportingList = ({
  searchType,
  searchKeyword,
  reportTopic,
}: {
  searchType: string;
  searchKeyword: string;
  reportTopic: string;
}) => {
  const { pagination, setPagination, resetPage, onNextPage, onPreviousPage } =
    usePagination();

  useEffect(() => {
    resetPage();
  }, [searchType, searchKeyword, reportTopic]);

  const { isLoading, data } = useQuery({
    staleTime: 0,
    queryKey: [
      "userReportingList",
      pagination.page,
      searchType,
      searchKeyword,
      reportTopic,
    ],
    queryFn: () =>
      supportManagementServices
        .getUserReports({
          page: pagination?.page,
          reportedUser:
            searchType === "reportedUser" ? searchKeyword : undefined,
          reportingUser:
            searchType === "reportingUser" ? searchKeyword : undefined,
          reportTopic: reportTopic,
        })
        .then((res) => {
          if (res.result) {
            const { reports, ...pagination } = res.result;
            setPagination(pagination);
            return reports;
          }
          return [];
        })
        .catch(() => {
          toast.error("Failed to get user reports");
          return [];
        }),
  });

  const transformData = (data: Array<UserReport>) => {
    if (!data) return [];
    return data.map((element) => [
      <p className="text-ellipsis cursor-pointer">{element.reportTopic}</p>,
      element.initiatorUserName,
      element.reportedUserName,
      element.reportStatus,
    ]);
  };
  return (
    <div className="w-full h-full px-14 mt-2">
      <TableWithPagination
        head={["Report Topic", "Initiator", "Reported User", "Report Status"]}
        body={transformData(data)}
        loading={isLoading}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        pagination={pagination}
      />
    </div>
  );
};

export default UserReportingList;
