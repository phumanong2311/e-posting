import { Button, Table } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { useDebouncedValue } from '@mantine/hooks'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useAppProviderCtx } from '../../app-provider'
import { userService } from '../../services'
import { User, UserPagination, paths } from '../../types'

export const UserSearch = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate()
  const {
    data: { user },
  } = useAppProviderCtx()
  const [users, setUsers] = useState<Array<User>>([])
  const [userPagination, setUserPagination] = useState<UserPagination>({
    page: 1,
  })
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500)

  useEffect(() => {
    resetPage()
  }, [keyword])

  useQuery({
    queryKey: ['userSearch', userPagination.page, debouncedSearchKeyword],
    queryFn: () =>
      userService
        .getUsers({
          page: userPagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { users, ...pagination } = res.result
            setUsers(users)
            setUserPagination(pagination)
            return res.result
          }
          return null
        }),
  })

  const resetPage = () => {
    setUserPagination((prev) => ({ ...prev, page: 1 }))
  }

  const onNextPage = () => {
    if (userPagination?.maxPages && userPagination?.page) {
      setUserPagination((prev) => ({ ...prev, page: prev.page! + 1 }))
    }
  }

  const onPreviousPage = () => {
    if (userPagination?.page! > 1) {
      setUserPagination((prev) => ({ ...prev, page: prev.page! - 1 }))
    }
  }

  const onViewDetail = (id: string | null) => {
    if (!id) return
    navigate(`/${paths.ROOT}/${paths.USER_DETAIL}/${id}`)
  }

  const onEdit = (id: string | null) => {
    if (!id) return
    navigate(`/${paths.ROOT}/${paths.EDIT_USER}/${id}`)
  }

  const rows = users.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(element._id!)}
      >
        {element.email}
      </Table.Td>
      <Table.Td className="text-center">
        {moment(element.signupDate).format('MM/DD/YYYY')}
      </Table.Td>
      <Table.Td className="text-center">
        {moment(element.updatedAt).format('MM/DD/YYYY')}
      </Table.Td>
      <Table.Td className="text-center">{element.accountStatus}</Table.Td>
      <Table.Td className="flex gap-2 justify-center items-center cursor-pointer">
        {user?.accountType! > 0 && (
          <IconEdit onClick={() => onEdit(element._id!)} />
        )}
        {/* {user?.accountType! > 1 && <IconTrash />} */}
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
              <Table.Th className="text-center">Sign-Up Date</Table.Th>
              <Table.Th className="text-center">Last Login</Table.Th>
              <Table.Th className="text-center">Status</Table.Th>
              <Table.Th className="text-center">Admin</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <div className="flex w-full justify-between">
          {userPagination.page! > 1 ? (
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
          {userPagination.maxPages! > 1 &&
            userPagination.page! < userPagination.maxPages! && (
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
