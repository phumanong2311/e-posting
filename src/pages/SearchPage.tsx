import { Button, Select, Table, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { IconEdit, IconSearch, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import jobService from "../services/job.service";
import { Job } from "../types/Job";
import { useAppProviderCtx } from "../app-provider/AppProvider";

const SearchPage = () => {
  const navigate = useNavigate();
  const {
    data: { user },
  } = useAppProviderCtx();
  const [jobs, setJobs] = useState<Array<Job>>([]);
  const [jobPagination, setJobPagination] = useState({});

  useEffect(() => {
    jobService.getJobSearch({}).then((res) => {
      if (res.result) {
        const { jobs, ...pagination } = res.result;
        setJobs(jobs);
        setJobPagination(pagination);
      }
    });
  }, []);

  const rows = jobs.map((element, index) => (
    <Table.Tr
      key={index}
      onClick={() =>
        navigate("/dashboard/job-postings/detail", {
          state: { isFromSearchPage: true },
        })
      }
      className="cursor-pointer "
    >
      <Table.Td>{element.description}</Table.Td>
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
        />
        <Select
          placeholder="Filters"
          radius={100}
          classNames={{
            input: "rounded-tl-none rounded-bl-none",
          }}
          className="mt-0 w-[30%]"
          data={[
            { value: "Jobs", label: "Jobs" },
            { value: "Companies", label: "Companies" },
            { value: "Users", label: "Users" },
            { value: "Requests", label: "Requests" },
          ]}
        />
      </div>

      <div className="w-full px-16 flex justify-between items-center gap-4 mt-5">
        <Select
          placeholder="Onsite/Remote"
          data={[
            {
              value: "remote",
              label: "Onsite/Remote",
            },
          ]}
          radius={100}
          className="w-full"
        />
        <Select
          placeholder="Full Time/Contract"
          data={[
            {
              value: "fulltime",
              label: "Full Time/Contract",
            },
          ]}
          radius={100}
          className="w-full"
        />
        <Select
          placeholder="Experience Level"
          data={[
            {
              value: "lv1",
              label: "Experience Level",
            },
          ]}
          radius={100}
          className="w-full"
        />
        <Select
          placeholder="Closing Date"
          data={[
            {
              value: "lv1",
              label: "Closing Date",
            },
          ]}
          radius={100}
          className="w-full"
        />
        <Button variant="outline" className="w-[500px]" size="sm">
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
        <p className="absolute right-16 bottom-16 text-purple-800">
          next page &gt;{" "}
        </p>
      </div>
    </div>
  );
};

export default SearchPage;
