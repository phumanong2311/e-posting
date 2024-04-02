import { Button, Table } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useDebouncedValue } from '@mantine/hooks'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useAppProviderCtx } from '../../app-provider'
import { requestService } from '../../services'
import { Request, RequestPagination, paths } from '../../types'

export const RequestSearch = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate()
  const {
    data: { user },
  } = useAppProviderCtx()
  const [requests, setRequests] = useState<Array<Request>>([])
  const [requestPagination, setRequestPagination] = useState<RequestPagination>(
    {
      page: 1,
    }
  )
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500)

  useEffect(() => {
    resetPage()
  }, [keyword])

  useQuery({
    queryKey: ['requestSearch', requestPagination.page, debouncedSearchKeyword],
    queryFn: () =>
      requestService
        .getResources({
          page: requestPagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { users: requests, ...pagination } = res.result
            setRequests(requests)
            setRequestPagination(pagination)
            return res.result
          }
          return null
        }),
  })

  const resetPage = () => {
    setRequestPagination((prev) => ({ ...prev, page: 1 }))
  }

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

  const onViewDetail = (id: string | null) => {
    if (!id) return
    navigate(`/${paths.ROOT}/${paths.REQUEST_DETAIL}/${id}`)
  }

  const onEdit = (id: string | null) => {
    if (!id) return
    navigate(`/${paths.ROOT}/${paths.EDIT_REQUEST}/${id}`)
  }

  const rows = requests.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(element._id!)}
      >
        {element.requestOwner}
      </Table.Td>
      <Table.Td className="text-center">{element.requestTitle}</Table.Td>
      <Table.Td className="text-center">
        {moment(element.closingDate).format('MM/DD/YYYY')}
      </Table.Td>
      <Table.Td className="text-center">{element.employmentType}</Table.Td>
      <Table.Td className="flex gap-2 justify-center items-center cursor-pointer">
        {user?.accountType! > 0 && (
          <IconEdit onClick={() => onEdit(element._id!)} />
        )}
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full px-14 mt-5">
        <Table withRowBorders={false} verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Description</Table.Th>
              <Table.Th className="text-center">Request Owner</Table.Th>
              <Table.Th className="text-center">Request Title</Table.Th>
              <Table.Th className="text-center">Closing Date</Table.Th>
              <Table.Th className="text-center">Emploment Type</Table.Th>
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
    </div>
  )
}