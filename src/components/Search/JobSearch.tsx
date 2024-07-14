import { useQuery } from "@tanstack/react-query";

import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Job, paths, ROLE, SearchParameter } from "../../types";
import { jobServices } from "../../services";
import { Filter } from "./Filter";
import usePagination from "../../hooks/usePagination";
import { toast } from "../../lib/toast";
import { TableWithPagination } from "../../ui";
import { useAppProviderCtx } from "../../app-provider";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { IconEdit, IconTrash } from "@tabler/icons-react";

export const JobSearch = ({ keyword }: { keyword: string }) => {
  const { pagination, setPagination, resetPage, onNextPage, onPreviousPage } =
    usePagination();
  const [searchParameter, setSearchParameter] = useState<SearchParameter>({});
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500);

  const {
    data: { user },
  } = useAppProviderCtx();
  const navigate = useNavigate();

  const onViewDetail = (id: string) => {
    navigate(`/${paths.ROOT}/${paths.DASHBOARD}/${paths.JOB_POSTING}/${id}`);
  };

  const onEdit = (id: string) => {
    navigate(
      `/${paths.ROOT}/${paths.DASHBOARD}/${paths.EDIT_JOB_POSTING}/${id}`
    );
  };

  useEffect(() => {
    resetPage();
  }, [keyword]);

  const { isLoading, data } = useQuery({
    queryKey: [
      "jobsSearch",
      searchParameter,
      pagination.page,
      debouncedSearchKeyword,
    ],
    queryFn: () =>
      jobServices
        .getJobSearch({
          searchParameter,
          page: pagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { jobs, ...pagination } = res.result;
            setPagination(pagination);
            return jobs;
          }
          return [];
        })
        .catch((e) => {
          console.log(e);
          toast.error("Get jobs failed");
          return [];
        }),
  });

  const onChangeParameter = (name: string, value: string) => {
    setSearchParameter((prev) => {
      return { ...prev, [name]: value };
    });
    resetPage();
  };

  const onResetFilter = () => {
    setSearchParameter({
      workLocationType: "",
      employmentType: "",
      yearsOfExperience: "",
      closingDate: "",
    });
    resetPage();
  };

  const transformData = (data: any) => {
    if (!data) return [];
    return data.map((job: Job) => [
      <p
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(job._id)}
      >
        {job.jobTitle}
      </p>,
      job.jobOwner,
      moment(job.createdAt).format("MM/DD/YYYY"),
      job.jobPostStatus,
      <span className="flex gap-2 justify-center items-center cursor-pointer">
        {user?.role === ROLE.EDITOR && (
          <IconEdit onClick={() => onEdit(job._id)} />
        )}
        {(user?.role === ROLE.EDITOR || user?.role === ROLE.ADMIN) && (
          <IconTrash />
        )}
      </span>,
    ]);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Filter
        searchParameter={searchParameter}
        onChangeParameter={onChangeParameter}
        onResetFilter={onResetFilter}
      />
      <div className="w-full px-14 mt-5">
        <TableWithPagination
          head={[
            "Description/Job Title",
            "Owner",
            "Posted date",
            "Status",
            "Admin",
          ]}
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
