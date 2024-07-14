import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useEffect } from "react";
import { Country, paths } from "../../types";
import { countryService } from "../../services";
import { TableWithPagination } from "../../ui";
import usePagination from "../../hooks/usePagination";
import { toast } from "../../lib/toast";

export const CountryList = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();
  const { pagination, setPagination, resetPage, onNextPage, onPreviousPage } =
    usePagination();

  const debouncedSearchKeyword = useDebouncedValue(keyword, 500);

  useEffect(() => {
    resetPage();
  }, [keyword]);

  const { isLoading, data } = useQuery({
    queryKey: ["countryList", pagination.page, debouncedSearchKeyword],
    queryFn: () =>
      countryService
        .getCountries({
          page: pagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { countries, ...pagination } = res.result;
            setPagination(pagination);
            return countries;
          }
          return [];
        })
        .catch(() => {
          toast.error("Get countries failed");
          return [];
        }),
  });

  const onEdit = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.COUNTRY_EDIT}/${id}`);
  };

  const onAddCountry = () => {
    navigate(`/${paths.ROOT}/${paths.COUNTRY_CREATE}`);
  };

  const transformData = (data: any) => {
    if (!data) return [];
    return data.map((country: Country) => [
      country.countryName,
      <IconEdit
        className="cursor-pointer"
        onClick={() => onEdit(country.countryId!)}
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
          onClick={onAddCountry}
        >
          Add Country
        </Button>
      </div>
      <div className="w-full px-14 mt-2">
        <TableWithPagination
          head={["Country", "Action"]}
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
