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
  body,
  pagination,
  loading,
  onNextPage,
  onPreviousPage,
}: TableWithPaginationProps) => {
  const tableData = {
    head,
    body,
    caption: !loading && !pagination.maxPages ? "No data available" : "",
  };
  return (
    <>
      {loading && <LoadingOverlay visible />}
      <Table
        withColumnBorders
        striped
        verticalSpacing="md"
        data={tableData}
        captionSide="bottom"
      />
      {body && body.length && (
        <PaginationButton
          pagination={pagination}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      )}
    </>
  );
};
