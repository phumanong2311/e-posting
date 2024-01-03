import { Table } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAppProviderCtx } from "../app-provider/AppProvider";
import jobService from "../services/job.service";
import { Job } from "../types/Job";

const MyJobPostingsPage = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Array<Job>>([]);
  const [jobPagination, setJobPagination] = useState({
    page: 1,
    // workLocationType: "Remote",
    // yearsOfExperience: "Mid-Senior",
  });
  const {
    data: { user },
  } = useAppProviderCtx();

  useQuery({
    queryKey: ["jobsList"],
    queryFn: () =>
      // jobService.getJobs({}).then((res) => {
      //   if (res.result) {
      //     const { jobs, ...pagination } = res.result;
      //     setJobs(jobs);
      //     setJobPagination(pagination);
      //     return res.result;
      //   }
      //   return null;
      // }),
      jobService.getListJob(jobPagination).then((res) => {
        console.log("res", res);
      }),
  });

  const rows = jobs.map((element, index) => (
    <Table.Tr
      key={index}
      onClick={() => navigate(`/dashboard/job-postings/${element._id}`)}
      className="cursor-pointer "
    >
      <Table.Td>{element.description}</Table.Td>
      <Table.Td className="text-center">{element.createdAt}</Table.Td>
      <Table.Td className="text-center">{element.jobPostStatus}</Table.Td>
      <Table.Td className="flex gap-2 justify-center items-center">
        {user?.accountType! > 0 && <IconEdit />}
        {user?.accountType! > 1 && <IconTrash />}
      </Table.Td>
    </Table.Tr>
  ));
  return (
    <div className="w-full px-14 mt-5">
      <Table withRowBorders={false} verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Description/Job Title</Table.Th>
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
  );
};

export default MyJobPostingsPage;
