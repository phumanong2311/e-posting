import { useQuery } from "@tanstack/react-query";

import { jobServices } from "../../services";
import { Job, paths, ROLE } from "../../types";
import { toast } from "../../lib/toast";
import { useAppProviderCtx } from "../../app-provider";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { TableWithPagination } from "../../ui";
import usePagination from "../../hooks/usePagination";

const MyJobPostingsPage = () => {
  const {
    data: { user },
  } = useAppProviderCtx();
  const navigate = useNavigate();

  const onViewDetail = (id: string) => {
    navigate(`/${paths.ROOT}/${paths.DASHBOARD}/${paths.MY_JOB_POSTING}/${id}`);
  };

  const onEdit = (id: string) => {
    navigate(
      `/${paths.ROOT}/${paths.DASHBOARD}/${paths.EDIT_JOB_POSTING}/${id}`
    );
  };
  const { pagination, setPagination, onNextPage, onPreviousPage } =
    usePagination();

  const { isLoading, data } = useQuery({
    queryKey: ["myJobLists", pagination.page],
    queryFn: () =>
      jobServices
        .getMyJobs({ page: pagination?.page })
        .then((res) => {
          if (res.result) {
            const { jobs, ...pagination } = res.result;
            setPagination(pagination);
            return jobs;
          }
          return [];
        })
        .catch(() => {
          toast.error("Get jobs failed");
          return [];
        }),
  });
  const head = ["Description/Job Title", "Posted date", "Status", "Admin"];
  const transformData = (data: Array<Job>) => {
    if (!data) return [];
    return data.map((element) => [
      <p
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(element._id)}
      >
        {element.jobTitle}
      </p>,
      moment(element.createdAt).format("MM/DD/YYYY"),
      element.jobPostStatus,
      <span className="flex gap-2 justify-center items-center cursor-pointer">
        {user?.role === ROLE.EDITOR && (
          <IconEdit onClick={() => onEdit(element._id)} />
        )}
        {(user?.role === ROLE.EDITOR || user?.role === ROLE.ADMIN) && (
          <IconTrash />
        )}
      </span>,
    ]);
  };

  return (
    <div className="w-full px-14 mt-5">
      <TableWithPagination
        head={head}
        body={transformData(data)}
        pagination={pagination}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        loading={isLoading}
      />
    </div>
  );
};

export default MyJobPostingsPage;
