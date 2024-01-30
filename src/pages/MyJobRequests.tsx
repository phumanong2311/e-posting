import { Button, Table } from '@mantine/core'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { jobService } from '../services'
import { Job, RequestPagination } from '../types'

const MyJobRequestsPage = () => {
  const navigate = useNavigate()
  const [requests, setRequests] = useState<Array<Job>>([])
  const [requestPagination, setRequestPagination] = useState<RequestPagination>(
    {
      page: 1,
    }
  )

  useQuery({
    queryKey: ['jobsRequestList', requestPagination.page],
    queryFn: () =>
      jobService
        .getMyJobsRequest({ page: requestPagination?.page })
        .then((res) => {
          if (res.result) {
            const { requests, ...pagination } = res.result
            setRequests(requests)
            setRequestPagination(pagination)
            return res.result
          }
          return null
        }),
  })

  const onNextPage = () => {
    if (requestPagination?.maxPages && requestPagination?.page) {
      setRequestPagination((prev) => ({ ...prev, page: prev.page! + 1 }))
    }
  }

  const onPreviousPage = () => {
    if (requestPagination?.page! > 1) {
      setRequestPagination((prev) => ({ ...prev, page: prev.page! - 1 }))
    }
  }

  const onViewDetail = (id: string) => {
    navigate(`/admin/dashboard/job-postings/${id}`)
  }

  const rows = requests.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td
        className="cursor-pointer "
        onClick={() => onViewDetail(element._id)}
      >
        {element.jobTitle}
      </Table.Td>
      <Table.Td className="text-center">{element.createdAt}</Table.Td>
      <Table.Td className="text-center">{element.jobPostStatus}</Table.Td>
    </Table.Tr>
  ))
  return (
    <div className="w-full px-14 mt-5">
      <Table withRowBorders={false} verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Job Title</Table.Th>
            <Table.Th className="text-center">Posted date</Table.Th>
            <Table.Th className="text-center">Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      <div className="flex w-full justify-between">
        {requestPagination.page! > 1 ? (
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
        {requestPagination.maxPages! > 1 &&
          requestPagination.page! < requestPagination.maxPages! && (
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
  )
}

export default MyJobRequestsPage
