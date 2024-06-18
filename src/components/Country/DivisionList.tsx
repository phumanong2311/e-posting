import { Button, Table, LoadingOverlay } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState, useMemo } from "react";
import { Division, DivisionPagination, paths } from "../../types";
import { countryService } from "../../services";
import { EmptyBoxMessage } from "../../ui";

export const DivisionList = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();
  const [divisions, setDivisions] = useState<Array<Division> | null>([]);
  const [divisionPagination, setDivisionPagination] =
    useState<DivisionPagination>({
      page: 1,
    });
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500);

  useEffect(() => {
    resetPage();
  }, [keyword]);

  const { isLoading } = useQuery({
    queryKey: ["divisionList", divisionPagination.page, debouncedSearchKeyword],
    queryFn: () =>
      countryService
        .getDivisions({
          page: divisionPagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { divisions, ...pagination } = res.result;
            setDivisions(divisions);
            setDivisionPagination(pagination);
            if (!res.result.divisions.length) setDivisions(null);
            return res.result;
          }
          return null;
        }),
  });

  const resetPage = () => {
    setDivisionPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onNextPage = () => {
    if (divisionPagination?.maxPages && divisionPagination?.page) {
      setDivisionPagination((prev) => ({ ...prev, page: prev.page! + 1 }));
    }
  };

  const onPreviousPage = () => {
    if (divisionPagination?.page! > 1) {
      setDivisionPagination((prev) => ({ ...prev, page: prev.page! - 1 }));
    }
  };

  const onViewDetail = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.SKILLS_DETAIL}/${id}`);
  };

  const onEdit = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.SKILLS_EDIT}/${id}`);
  };

  const onAddSkill = () => {
    navigate(`/${paths.ROOT}/${paths.SKILLS_CREATE}`);
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

    if (divisions === null) {
      return (
        <tr>
          <td colSpan={3}>
            <EmptyBoxMessage className="h-60" />
          </td>
        </tr>
      );
    }

    return divisions.map((element, index) => (
      <Table.Tr key={index}>
        <Table.Td
          className="text-ellipsis cursor-pointer"
          onClick={() => onViewDetail(element.divisionId!)}
        >
          {element.divisionName}
        </Table.Td>
        <Table.Td>
          <IconEdit />
        </Table.Td>
      </Table.Tr>
    ));
  }, [divisions, isLoading]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-fit mt-5 px-14">
        <Button
          variant="outline"
          className="w-fit float-right"
          size="sm"
          onClick={onAddSkill}
        >
          Add State/Province
        </Button>
      </div>
      <div className="w-full px-14 mt-2">
        <Table withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Division</Table.Th>
              <Table.Th>Action</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <div className="flex w-full justify-between">
          {divisionPagination.page! > 1 ? (
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
          {divisionPagination.maxPages! > 1 &&
            divisionPagination.page! < divisionPagination.maxPages! && (
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
