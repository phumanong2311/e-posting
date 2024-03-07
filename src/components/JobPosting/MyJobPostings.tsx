import { Button, Table } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppProviderCtx } from '../../app-provider/AppProvider'
import { jobService } from '../../services'
import { Job, JobPagination, paths } from '../../types'
import { ROLE } from '../../types/enums/role'
import { JobList } from '../JobList'

const MyJobPostingsPage = () => {
  const navigate = useNavigate()
  const [jobs, setJobs] = useState<Array<Job>>([])
  const [jobPagination, setJobPagination] = useState<JobPagination>({
    page: 1,
  })
  const {
    data: { user },
  } = useAppProviderCtx()

  useQuery({
    queryKey: ['jobsList', jobPagination.page],
    queryFn: () =>
      jobService.getMyJobs({ page: jobPagination?.page }).then((res) => {
        if (res.result) {
          const { jobs, ...pagination } = res.result
          setJobs(jobs)
          setJobPagination(pagination)
          return res.result
        }
        return null
      }),
  })

  const onNextPage = () => {
    if (jobPagination?.maxPages && jobPagination?.page) {
      setJobPagination((prev) => ({ ...prev, page: prev.page! + 1 }))
    }
  }

  const onPreviousPage = () => {
    if (jobPagination?.page! > 1) {
      setJobPagination((prev) => ({ ...prev, page: prev.page! - 1 }))
    }
  }

  const onViewDetail = (id: string) => {
    navigate(`/${paths.ROOT}/${paths.DASHBOARD}/${paths.JOB_POSTING}/${id}`)
  }

  const onEdit = (id: string) => {
    navigate(
      `/${paths.ROOT}/${paths.DASHBOARD}/${paths.EDIT_JOB_POSTING}/${id}`
    )
  }

  const rows = jobs.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td
        className="cursor-pointer "
        onClick={() => onViewDetail(element._id)}
      >
        {element.jobTitle}
      </Table.Td>
      <Table.Td className="text-center">{element.createdAt}</Table.Td>
      <Table.Td className="text-center">{element.jobPostStatus}</Table.Td>
      <Table.Td className="flex gap-2 justify-center items-center">
        <IconEdit
          className="cursor-pointer"
          onClick={() => onEdit(element._id!)}
        />
        <IconTrash />
      </Table.Td>
    </Table.Tr>
  ))
  return (
    <div className="w-full">
      {/* <Table withRowBorders={false} verticalSpacing="md">
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
      </div> */}

      <JobList
        jobs={jobs}
        page={jobPagination.page!}
        maxPage={jobPagination.maxPages!}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </div>
  )
}

export default MyJobPostingsPage
