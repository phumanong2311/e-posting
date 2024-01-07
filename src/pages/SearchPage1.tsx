import { Button, Select, Table, TextInput } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useDebouncedValue } from "@mantine/hooks";
import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAppProviderCtx } from "../app-provider/AppProvider";
import jobService from "../services/job.service";
import { Job } from "../types/Job";
import { JobPagination } from "../types/JobPagination";
import { SearchParameter, SearchType } from "../types/SearchType";

const SearchPage = () => {
  const navigate = useNavigate();
  const {
    data: { user },
  } = useAppProviderCtx();
  const [jobs, setJobs] = useState<Array<Job>>([]);
  const [jobPagination, setJobPagination] = useState<JobPagination>({
    page: 1,
  });

  const [searchType, setSearchType] = useState<SearchType>(SearchType.Jobs);
  const [searchParameter, setSearchParameter] = useState<SearchParameter>({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const debouncedSearchKeyword = useDebouncedValue(searchKeyword, 500);

  useEffect(() => {});

  useQuery({
    queryKey: [
      "jobsSearch",
      searchParameter,
      jobPagination.page,
      debouncedSearchKeyword,
    ],
    queryFn: () =>
      jobService
        .getJobSearch({
          ...searchParameter,
          page: jobPagination?.page,
          keyword: searchKeyword,
        })
        .then((res) => {
          if (res.result) {
            const { jobs, ...pagination } = res.result;
            setJobs(jobs);
            setJobPagination(pagination);
            return res.result;
          }
          return null;
        }),
  });

  const onChangeSearchType = (e: SyntheticEvent<HTMLInputElement, Event>) => {
    if (!e.target) return;
    const value = (e.target as HTMLInputElement).value as SearchType;
    setSearchType(value);
    resetPage();
  };

  const onChangeParameter = (name: string, value: string) => {
    setSearchParameter({ ...searchParameter, [name]: value });
    resetPage();
  };

  const onChangeSearchKeyword = (
    e: SyntheticEvent<HTMLInputElement, Event>
  ) => {
    if (!e?.target) return;
    const { value } = e.target as HTMLInputElement;
    setSearchKeyword(value);
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

  const resetPage = () => {
    setJobPagination((prev) => ({ ...prev, page: 1 }));
  };

  const onNextPage = () => {
    if (jobPagination?.maxPages && jobPagination?.page) {
      setJobPagination((prev) => ({ ...prev, page: prev.page! + 1 }));
    }
  };

  const onPreviousPage = () => {
    if (jobPagination?.page! > 1) {
      setJobPagination((prev) => ({ ...prev, page: prev.page! - 1 }));
    }
  };

  const rows = jobs.map((element, index) => (
    <Table.Tr
      key={index}
      onClick={() =>
        navigate(`/dashboard/job-postings/${element._id}`, {
          state: { isFromSearchPage: true },
        })
      }
      className="cursor-pointer "
    >
      <Table.Td className="text-ellipsis">{element.description}</Table.Td>
      <Table.Td className="text-center">{element.jobOwner}</Table.Td>
      <Table.Td className="text-center">{element.createdAt}</Table.Td>
      <Table.Td className="text-center">{element.jobPostStatus}</Table.Td>
      <Table.Td className="flex gap-2 justify-center items-center">
        {user?.accountType! > 0 && <IconEdit />}
        {user?.accountType! > 1 && <IconTrash />}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="max-w-[400px] mt-10 flex items-center">
        <TextInput
          leftSection={<IconSearch />}
          radius={100}
          classNames={{
            input: "rounded-tr-none rounded-br-none border-r-0",
          }}
          className="w-[70%]"
          name="keyword"
          value={searchKeyword}
          onChange={(e) => onChangeSearchKeyword(e)}
        />
        <Select
          placeholder="Filters"
          radius={100}
          classNames={{
            input: "rounded-tl-none rounded-bl-none",
          }}
          className="mt-0 w-[30%]"
          data={[
            { value: SearchType.Jobs, label: "Jobs" },
            { value: SearchType.Companies, label: "Companies" },
          ]}
          value={searchType}
          onSelect={(e) => onChangeSearchType(e)}
        />
      </div>

      <div className="w-full px-16 flex justify-between items-center gap-4 mt-5">
        <Select
          placeholder="Onsite/Remote"
          data={[
            {
              value: "onsite",
              label: "Onsite",
            },
            {
              value: "remote",
              label: "Remote",
            },
            {
              value: "hybrid",
              label: "Hybrid",
            },
          ]}
          radius={100}
          className="w-full"
          name="workLocationType"
          value={searchParameter.workLocationType}
          onChange={(value) =>
            onChangeParameter("workLocationType", value as string)
          }
        />
        <Select
          placeholder="Full Time/Contract"
          data={[
            {
              value: "fulltime",
              label: "Fulltime",
            },
            {
              value: "parttime",
              label: "Part Time",
            },
            {
              value: "contract",
              label: "Contract",
            },
          ]}
          radius={100}
          className="w-full"
          name="employmentType"
          value={searchParameter.employmentType}
          onChange={(value) =>
            onChangeParameter("employmentType", value as string)
          }
        />
        <Select
          placeholder="Experience Level"
          data={[
            {
              value: "entry",
              label: "Entry",
            },
            {
              value: "entry-mid",
              label: "Entry-Mid",
            },
            {
              value: "mid-senior",
              label: "Mid-Senior",
            },
            {
              value: "senior",
              label: "Senior",
            },
          ]}
          radius={100}
          className="w-full"
          name="yearsOfExperience"
          value={searchParameter.yearsOfExperience}
          onChange={(value) =>
            onChangeParameter("yearsOfExperience", value as string)
          }
        />
        <Select
          placeholder="Closing Date"
          data={[
            {
              value: "24-hour",
              label: "24 Hours",
            },
            {
              value: "1-week",
              label: "1 Week",
            },
            {
              value: "2-week",
              label: "2 Weeks",
            },
            {
              value: "4-week",
              label: "4 Weeks",
            },
          ]}
          radius={100}
          className="w-full"
          name="closingDate"
          value={searchParameter.closingDate}
          onChange={(value) =>
            onChangeParameter("closingDate", value as string)
          }
        />
        <Button
          variant="outline"
          className="w-[500px]"
          size="sm"
          onClick={() => onResetFilter()}
        >
          Reset filters
        </Button>
      </div>

      <div className="w-full px-14 mt-5">
        <Table withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Description/Job Title</Table.Th>
              <Table.Th className="text-center">Owner</Table.Th>
              <Table.Th className="text-center">Posted date</Table.Th>
              <Table.Th className="text-center">Status</Table.Th>
              <Table.Th className="text-center">Admin</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <div className="flex w-full justify-between">
          {jobPagination.page! > 1 ? (
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
          {jobPagination.maxPages! > 1 &&
            jobPagination.page! < jobPagination.maxPages! && (
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

export default SearchPage;
