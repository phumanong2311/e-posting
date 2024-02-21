import { Button, Table } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useDebouncedValue } from '@mantine/hooks'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useAppProviderCtx } from '../../app-provider'
import { Company, CompanyPagination } from '../../types'
import { companyService } from '../../services'

const CompanySearch = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate()
  const {
    data: { user },
  } = useAppProviderCtx()
  const [companies, setCompanies] = useState<Array<Company>>([])
  const [companyPagination, setCompanyPagination] = useState<CompanyPagination>(
    {
      page: 1,
    }
  )
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500)

  useEffect(() => {
    resetPage()
  }, [keyword])

  useQuery({
    queryKey: ['companySearch', companyPagination.page, debouncedSearchKeyword],
    queryFn: () =>
      companyService
        .getCompanies({
          page: companyPagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { companies, ...pagination } = res.result
            setCompanies(companies)
            setCompanyPagination(pagination)
            return res.result
          }
          return null
        }),
  })

  const resetPage = () => {
    setCompanyPagination((prev) => ({ ...prev, page: 1 }))
  }

  const onNextPage = () => {
    if (companyPagination?.maxPages && companyPagination?.page) {
      setCompanyPagination((prev) => ({ ...prev, page: prev.page! + 1 }))
    }
  }

  const onPreviousPage = () => {
    if (companyPagination?.page! > 1) {
      setCompanyPagination((prev) => ({ ...prev, page: prev.page! - 1 }))
    }
  }

  const onViewDetail = (id: string) => {
    //TODO: Implement onViewDetail
    // navigate(`/admin/dashboard/job-postings/${id}`)
  }

  const onEdit = (id: string) => {
    //TODO: Implement Edit company
    // navigate(`/admin/dashboard/edit-job-posting/${id}`, {
    //   state: { isFromSearchPage: true },
    // })
  }

  const rows = companies.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(element._id)}
      >
        {element.companyName}
      </Table.Td>
      <Table.Td className="text-center">{element.ceo}</Table.Td>
      <Table.Td className="text-center">{element.companyStatus}</Table.Td>
      <Table.Td className="flex gap-2 justify-center items-center cursor-pointer">
        {user?.accountType! > 0 && (
          <IconEdit onClick={() => onEdit(element._id)} />
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
              <Table.Th className="text-center">CEO</Table.Th>
              <Table.Th className="text-center">Status</Table.Th>
              <Table.Th className="text-center">Admin</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
        <div className="flex w-full justify-between">
          {companyPagination.page! > 1 ? (
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
          {companyPagination.maxPages! > 1 &&
            companyPagination.page! < companyPagination.maxPages! && (
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

export default CompanySearch
