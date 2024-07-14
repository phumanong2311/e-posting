import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useEffect } from "react";
import { Division, paths } from "../../types";
import { countryService } from "../../services";
import { TableWithPagination } from "../../ui";
import { toast } from "../../lib/toast";
import usePagination from "../../hooks/usePagination";

export const DivisionList = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();
  const { pagination, setPagination, resetPage, onNextPage, onPreviousPage } =
    usePagination();
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500);

  useEffect(() => {
    resetPage();
  }, [keyword]);

  const { isLoading, data } = useQuery({
    queryKey: ["divisionList", pagination.page, debouncedSearchKeyword],
    queryFn: () =>
      countryService
        .getDivisions({
          page: pagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { divisions, ...pagination } = res.result;
            setPagination(pagination);
            return divisions;
          }
          return [];
        })
        .catch(() => {
          toast.error("Get divisions failed");
          return [];
        }),
  });

  const onEdit = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.DIVISION_EDIT}/${id}`);
  };

  const onAddDivision = () => {
    navigate(`/${paths.ROOT}/${paths.DIVISION_CREATE}`);
  };

  const transformData = (data: any) => {
    if (!data) return [];
    return data.map((division: Division) => [
      division.divisionName,
      division.countryName,
      <IconEdit
        className="cursor-pointer"
        onClick={() => onEdit(division.divisionId!)}
      />,
    ]);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-fit mt-5 px-14">
        <Button
          variant="outline"
          className="w-fit float-right"
          size="sm"
          onClick={onAddDivision}
        >
          Add State/Province
        </Button>
      </div>
      <div className="w-full px-14 mt-2">
        <TableWithPagination
          head={["Division", "Country", "Action"]}
          body={transformData(data)}
          pagination={pagination}
          loading={isLoading}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
    </div>
  );
};
