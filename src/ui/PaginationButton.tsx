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
        variant="default"
        className="w-fit h-full"
        size="sm"
        onClick={onPreviousPage}
      >
        Previous
      </Button>
    ) : (
      <div></div>
    );
  const renderNextButton = () =>
    isShowNext ? (
      <Button
        variant="outline"
        className="w-fit float-right h-full"
        size="sm"
        onClick={onNextPage}
      >
        Next
      </Button>
    ) : (
      <div></div>
    );
  return (
    <div className="flex w-full justify-between h-[40px] mt-4">
      {renderPreviousButton()}
      {renderNextButton()}
    </div>
  );
};
