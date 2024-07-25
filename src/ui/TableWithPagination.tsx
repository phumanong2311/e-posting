import { LoadingOverlay, Table } from "@mantine/core";
import { Pagination } from "../types/Pagination";
import { PaginationButton } from "./PaginationButton";

export type TableWithPaginationProps = {
  head: string[];
  body: any[][];
  pagination: Pagination;
  loading: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
};
export const TableWithPagination = ({
  head,
  body = [[]],
  pagination,
  loading,
  onNextPage,
  onPreviousPage,
}: TableWithPaginationProps) => {
  const tableData = {
    head,
    body,
    caption: !loading && !body.length ? "No data available" : "",
  };
  return (
    <>
      {loading && <LoadingOverlay visible />}
      <Table
        verticalSpacing="md"
        data={tableData}
        captionSide="bottom"
        className="noBorderBottomTrTableMantine"
      />
      {!!body.length && (
        <PaginationButton
          pagination={pagination}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      )}
    </>
  );
};
