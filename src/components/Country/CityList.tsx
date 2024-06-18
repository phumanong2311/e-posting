import { Button, Table, LoadingOverlay } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState, useMemo } from "react";
import { City, CityPagination, paths } from "../../types";
import { countryService } from "../../services";
import { EmptyBoxMessage } from "../../ui";

export const CityList = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();
  const [cities, setCities] = useState<Array<City> | null>([]);
  const [cityPagination, setCityPagination] = useState<CityPagination>({
    page: 1,
  });
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500);

  useEffect(() => {
    resetPage();
  }, [keyword]);

  const { isLoading } = useQuery({
    queryKey: ["cityList", cityPagination.page, debouncedSearchKeyword],
    queryFn: () =>
      countryService
        .getCities({
          page: cityPagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { cities, ...pagination } = res.result;
            setCities(cities);
            setCityPagination(pagination);
            if (!res.result.cities.length) setCities(null);
            return res.result;
          }
          return null;
        }),
  });

  const resetPage = () => {
    setCityPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onNextPage = () => {
    if (cityPagination?.maxPages && cityPagination?.page) {
      setCityPagination((prev) => ({ ...prev, page: prev.page! + 1 }));
    }
  };

  const onPreviousPage = () => {
    if (cityPagination?.page! > 1) {
      setCityPagination((prev) => ({ ...prev, page: prev.page! - 1 }));
    }
  };

  const onEdit = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.CITY_EDIT}/${id}`);
  };

  const onAddCity = () => {
    navigate(`/${paths.ROOT}/${paths.CITY_CREATE}`);
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

    if (cities === null) {
      return (
        <tr>
          <td colSpan={3}>
            <EmptyBoxMessage className="h-60" />
          </td>
        </tr>
      );
    }

    return cities.map((element, index) => (
      <Table.Tr key={index}>
        <Table.Td className="text-ellipsis cursor-pointer">
          {element.cityName}
        </Table.Td>
        <Table.Td>
          <IconEdit onClick={() => onEdit(element.cityId!)} />
        </Table.Td>
      </Table.Tr>
    ));
  }, [cities, isLoading]);

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
        <Table withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>City</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <div className="flex w-full justify-between">
          {cityPagination.page! > 1 ? (
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
          )}
          {cityPagination.maxPages! > 1 &&
            cityPagination.page! < cityPagination.maxPages! && (
              <Button
                variant="outline"
                className="w-fit float-right"
                size="sm"
                onClick={onNextPage}
              >
                next page &gt;
              </Button>
            )}
        </div>
      </div>
    </div>
  );
};
