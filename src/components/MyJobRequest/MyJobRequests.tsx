import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { jobServices } from "../../services";
import { Request, paths } from "../../types";
import { TableWithPagination } from "../../ui";
import usePagination from "../../hooks/usePagination";
import { toast } from "../../lib/toast";
import moment from "moment";

const MyJobRequestsPage = () => {
  const navigate = useNavigate();
  const { pagination, setPagination, onNextPage, onPreviousPage } =
    usePagination();

  const { isLoading, data } = useQuery({
    queryKey: ["jobsRequestList", pagination.page],
    queryFn: () =>
      jobServices
        .getMyJobsRequest({ page: pagination?.page })
        .then((res) => {
          if (res.result) {
            const { requests, ...pagination } = res.result;
            setPagination(pagination);
            return requests;
          }
          return [];
        })
        .catch(() => {
          toast.error("Get jobs failed");
          return [];
        }),
  });

  const onViewDetail = (id: string) => {
    navigate(`/${paths.ROOT}/${paths.DASHBOARD}/${paths.MY_JOB_REQUEST}/${id}`);
  };
  const transformData = (data: Array<Request>) => {
    if (!data) return [];
    return data.map((element) => [
      <p
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(element.resourceId)}
      >
        {element.requestTitle}
      </p>,
      moment(element.createdAt).format("MM/DD/YYYY"),
      element.requestPostStatus,
    ]);
  };

  return (
    <div className="w-full px-14 mt-5">
      <TableWithPagination
        head={["Job Title", "Posted date", "Status"]}
        body={transformData(data)}
        pagination={pagination}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
        loading={isLoading}
      />
    </div>
  );
};

export default MyJobRequestsPage;
