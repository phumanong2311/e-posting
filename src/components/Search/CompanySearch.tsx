import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import { useEffect } from "react";
import { useAppProviderCtx } from "../../app-provider";
import { Company, paths } from "../../types";
import { companyServices } from "../../services";
import { TableWithPagination } from "../../ui";
import usePagination from "../../hooks/usePagination";
import { toast } from "../../lib/toast";

export const CompanySearch = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();
  const {
    data: { user },
  } = useAppProviderCtx();
  const { pagination, setPagination, resetPage, onNextPage, onPreviousPage } =
    usePagination();
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500);

  useEffect(() => {
    resetPage();
  }, [keyword]);

  const { isLoading, data } = useQuery({
    queryKey: ["companySearch", pagination.page, debouncedSearchKeyword],
    queryFn: () =>
      companyServices
        .getCompanies({
          page: pagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { companies, ...pagination } = res.result;
            setPagination(pagination);
            return companies;
          }
          return [];
        })
        .catch(() => {
          toast.error("Get companies failed");
          return [];
        }),
  });

  const onViewDetail = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.COMPANY_DETAIL}/${id}`);
  };

  const onEdit = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.EDIT_COMPANY}/${id}`);
  };

  const onAddCompany = () => {
    navigate(`/${paths.ROOT}/${paths.CREATE_COMPANY}`);
  };

  const transformData = (data: Array<Company>) => {
    if (!data) return [];
    return data.map((element) => [
      <p
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(element._id!)}
      >
        {element.companyName}
      </p>,
      element.companyCeo,
      element.companyStatus,
      <span className="flex gap-2 justify-center items-center cursor-pointer">
        {user?.accountType! > 0 && (
          <IconEdit onClick={() => onEdit(element._id!)} />
        )}
      </span>,
    ]);
  };
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-fit mt-5 px-14">
        <Button
          variant="outline"
          className="w-fit float-right"
          size="sm"
          onClick={onAddCompany}
        >
          Add Company
        </Button>
      </div>

      <div className="w-full px-14 mt-2">
        <TableWithPagination
          head={["Description", "CEO", "Status", "Admin"]}
          body={transformData(data)}
          pagination={pagination}
          onPreviousPage={onPreviousPage}
          onNextPage={onNextPage}
          loading={isLoading}
        />
      </div>
    </div>
  );
};
