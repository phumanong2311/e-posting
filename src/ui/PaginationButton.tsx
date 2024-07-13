import { Button } from "@mantine/core";
import { Pagination } from "../types/Pagination";

export type PaginationButtonProps = {
  pagination: Pagination;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

export const PaginationButton = ({
  pagination,
  onNextPage,
  onPreviousPage,
}: PaginationButtonProps) => {
  const isShowPrevious = pagination.page! > 1;
  const isShowNext =
    pagination.maxPages! > 1 && pagination.page! < pagination.maxPages!;
  const renderPreviousButton = () =>
    isShowPrevious ? (
      <Button
        variant="outline"
        className="w-fit"
        size="sm"
        onClick={onPreviousPage}
      >
        &lt; previous page
      </Button>
    ) : (
      <div></div>
    );
  const renderNextButton = () =>
    isShowNext ? (
      <Button
        variant="outline"
        className="w-fit float-right"
        size="sm"
        onClick={onNextPage}
      >
        next page &gt;
      </Button>
    ) : (
      <div></div>
    );
  return (
    <div className="flex w-full justify-between">
      {renderPreviousButton()}
      {renderNextButton()}
    </div>
  );
};
