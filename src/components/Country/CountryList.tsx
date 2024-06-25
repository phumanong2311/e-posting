import { Button, Table, LoadingOverlay } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState, useMemo } from "react";
import { Country, CountryPagination, paths } from "../../types";
import { countryService } from "../../services";
import { EmptyBoxMessage } from "../../ui";

export const CountryList = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<Array<Country> | null>([]);
  const [countryPagination, setCountryPagination] = useState<CountryPagination>(
    {
      page: 1,
    }
  );
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500);

  useEffect(() => {
    resetPage();
  }, [keyword]);

  const { isLoading } = useQuery({
    queryKey: ["countryList", countryPagination.page, debouncedSearchKeyword],
    queryFn: () =>
      countryService
        .getCountries({
          page: countryPagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { countries, ...pagination } = res.result;
            setCountries(countries);
            setCountryPagination(pagination);
            if (!res.result.countries.length) setCountries(null);
            return res.result;
          }
          return null;
        }),
  });

  const resetPage = () => {
    setCountryPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onNextPage = () => {
    if (countryPagination?.maxPages && countryPagination?.page) {
      setCountryPagination((prev) => ({ ...prev, page: prev.page! + 1 }));
    }
  };

  const onPreviousPage = () => {
    if (countryPagination?.page! > 1) {
      setCountryPagination((prev) => ({ ...prev, page: prev.page! - 1 }));
    }
  };

  const onEdit = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.COUNTRY_EDIT}/${id}`);
  };

  const onAddCountry = () => {
    navigate(`/${paths.ROOT}/${paths.COUNTRY_CREATE}`);
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

    if (countries === null) {
      return (
        <tr>
          <td colSpan={3}>
            <EmptyBoxMessage className="h-60" />
          </td>
        </tr>
      );
    }

    return countries.map((element, index) => (
      <Table.Tr key={index}>
        <Table.Td className="text-ellipsis">
          {element.countryName}
        </Table.Td>
        <Table.Td>
          <IconEdit className="cursor-pointer" onClick={() => onEdit(element.countryId!)} />
        </Table.Td>
      </Table.Tr>
    ));
  }, [countries, isLoading]);

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
        <Table withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Country</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <div className="flex w-full justify-between">
          {countryPagination.page! > 1 ? (
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
          {countryPagination.maxPages! > 1 &&
            countryPagination.page! < countryPagination.maxPages! && (
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
