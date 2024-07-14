import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppProviderCtx } from "../../app-provider";
import { requestServices } from "../../services";
import { Request, paths } from "../../types";
import { toast } from "../../lib/toast";
import { TableWithPagination } from "../../ui";
import usePagination from "../../hooks/usePagination";

export const RequestSearch = ({ keyword }: { keyword: string }) => {
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

  const { isLoading, refetch, data } = useQuery({
    queryKey: ["requestSearch", pagination.page, debouncedSearchKeyword],
    queryFn: () =>
      requestServices
        .getResources({
          page: pagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { requests, ...pagination } = res.result;
            setPagination(pagination);
            return requests;
          }
          return [];
        })
        .catch(() => {
          toast.error("Get requests failed");
          return [];
        }),
  });

  const onViewDetail = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.DASHBOARD}/${paths.REQUEST_DETAIL}/${id}`);
  };

  const onEdit = (id: string | null) => {
    if (!id) return;
    navigate(`/${paths.ROOT}/${paths.DASHBOARD}/${paths.EDIT_REQUEST}/${id}`);
  };

  const onDelete = async (id: string) => {
    await requestServices
      .deleteRequest(id!)
      .then((result) => {
        result && toast.success("Request is deleted successfully");
        refetch();
      })
      .catch(() => {
        toast.error("Request delete failed");
      });
  };

  const transformData = (data: Array<Request>) => {
    if (!data) return [];
    return data.map((element) => [
      <p
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(element._id)}
      >
        {element.requestOwner}
      </p>,
      element.requestTitle,
      moment(element.closingDate).format("MM/DD/YYYY"),
      element.employmentType,
      <span className="flex gap-2 justify-center items-center cursor-pointer">
        {user?.accountType! > 0 && (
          <>
            <IconEdit onClick={() => onEdit(element._id!)} />
            <IconTrash onClick={() => onDelete(element._id)} />
          </>
        )}
      </span>,
    ]);
  };
  return (
    <div className="w-full h-full px-14 mt-5">
      <TableWithPagination
        head={[
          "Request Owner",
          "Request Title",
          "Closing Date",
          "Employment Type",
          "Action",
        ]}
        body={transformData(data)}
        pagination={pagination}
        loading={isLoading}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </div>
  );
};
