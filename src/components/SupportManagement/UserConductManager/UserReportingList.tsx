import { LoadingOverlay, Table } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { toast } from "../../../lib/toast";
import { supportManagementServices } from "../../../services";
import { EmptyBoxMessage, PaginationButton } from "../../../ui";
import { UserReport, UserReportPagination } from "../../../types";

const UserReportingList = ({
  searchType,
  searchKeyword,
  reportTopic,
}: {
  searchType: string;
  searchKeyword: string;
  reportTopic: string;
}) => {
  const [reports, setReports] = useState<Array<UserReport> | null>([]);
  const [pagination, setPagination] = useState<UserReportPagination>({
    page: 1,
  });

  useEffect(() => {
    resetPage();
  }, [searchType, searchKeyword, reportTopic]);

  const { isLoading } = useQuery({
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
            setReports(reports);
            setPagination(pagination);
            if (!reports.length) setReports(null);
            return res.result;
          }
          return null;
        })
        .catch(() => {
          toast.error("Failed to get user reports");
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

    if (reports === null) {
      return (
        <tr>
          <td colSpan={4}>
            <EmptyBoxMessage className="h-60" />
          </td>
        </tr>
      );
    }

    return reports.map((element, index) => (
      <Table.Tr key={index}>
        <Table.Td>{element.reportTopic}</Table.Td>
        <Table.Td className="text-ellipsis">
          {element.initiatorUserName}
        </Table.Td>
        <Table.Td>{element.reportedUserName}</Table.Td>
        <Table.Td>{element.reportStatus}</Table.Td>
      </Table.Tr>
    ));
  }, [reports, isLoading]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full px-14 mt-2">
        <Table withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Report Topic</Table.Th>
              <Table.Th>Initiator</Table.Th>
              <Table.Th>Reported User</Table.Th>
              <Table.Th>Report Status</Table.Th>
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

export default UserReportingList;
