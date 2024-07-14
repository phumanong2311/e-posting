import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useEffect } from "react";
import { City, paths } from "../../types";
import { countryService } from "../../services";
import { TableWithPagination } from "../../ui";
import { toast } from "../../lib/toast";
import usePagination from "../../hooks/usePagination";

export const CityList = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();
  const { pagination, setPagination, resetPage, onNextPage, onPreviousPage } =
    usePagination();
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500);

  useEffect(() => {
    resetPage();
  }, [keyword]);

  const { isLoading, data } = useQuery({
    queryKey: ["cityList", pagination.page, debouncedSearchKeyword],
    queryFn: () =>
      countryService
        .getCities({
          page: pagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { cities, ...pagination } = res.result;
            setPagination(pagination);
            return cities.map((city: City) => [
              city.cityName,
              city.divisionName,
              city.countryName,
              <IconEdit
                className="cursor-pointer"
                onClick={() => onEdit(city.cityId!)}
              />,
            ]);
          }
          return [];
        })
        .catch(() => {
          toast.error("Get cities failed");
          return [];
        }),
  });

  const onEdit = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.CITY_EDIT}/${id}`);
  };

  const onAddCity = () => {
    navigate(`/${paths.ROOT}/${paths.CITY_CREATE}`);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-fit mt-5 px-14">
        <Button
          variant="outline"
          className="w-fit float-right"
          size="sm"
          onClick={onAddCity}
        >
          Add City
        </Button>
      </div>
      <div className="w-full px-14 mt-2">
        <TableWithPagination
          head={["City", "State (Division)", "Country", "Action"]}
          body={data}
          pagination={pagination}
          loading={isLoading}
          onNextPage={onNextPage}
          onPreviousPage={onPreviousPage}
        />
      </div>
    </div>
  );
};
