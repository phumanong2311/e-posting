import { Button, LoadingOverlay, Table } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useDebouncedValue } from '@mantine/hooks'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useMemo, useState } from 'react'
import { useAppProviderCtx } from '../../app-provider'
import { Company, CompanyPagination, paths } from '../../types'
import { companyServices } from '../../services'
import { EmptyBoxMessage } from '../../ui'

export const CompanySearch = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate()
  const {
    data: { user },
  } = useAppProviderCtx()
  const [companies, setCompanies] = useState<Array<Company> | null>([])
  const [companyPagination, setCompanyPagination] = useState<CompanyPagination>(
    {
      page: 1,
    }
  )
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500)

  useEffect(() => {
    resetPage()
  }, [keyword])

  const { isLoading } = useQuery({
    queryKey: ['companySearch', companyPagination.page, debouncedSearchKeyword],
    queryFn: () =>
      companyServices
        .getCompanies({
          page: companyPagination?.page,
          keyword,
        })
        .then((res) => {
          if (res.result) {
            const { companies, ...pagination } = res.result
            setCompanies(companies)
            setCompanyPagination(pagination)
            if (!res.result.companies.length) setCompanies(null);
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

  const onViewDetail = (id: string | null) => {
    if (!id) return
    navigate(`/${paths.ROOT}/${paths.COMPANY_DETAIL}/${id}`)
  }

  const onEdit = (id: string | null) => {
    if (!id) return
    navigate(`/${paths.ROOT}/${paths.EDIT_COMPANY}/${id}`)
  }

  const onAddCompany = () => {
    navigate(`/${paths.ROOT}/${paths.CREATE_COMPANY}`)
  }

  const rows = useMemo(() => {
    if (isLoading) {
      return (
        <LoadingOverlay
          visible={isLoading}
          zIndex={1000}
          overlayProps={{ radius: "sm" }}
        />
      );
    }

    if (companies === null) {
      return (
        <tr>
          <td colSpan={4}>
            <EmptyBoxMessage className="h-60" />
          </td>
        </tr>
      );
    }
    
    return companies.map((element, index) => (
      <Table.Tr key={index}>
        <Table.Td
          className="text-ellipsis cursor-pointer"
          onClick={() => onViewDetail(element._id!)}
        >
          {element.companyName}
        </Table.Td>
        <Table.Td className="text-center">{element.companyCeo}</Table.Td>
        <Table.Td className="text-center">{element.companyStatus}</Table.Td>
        <Table.Td className="flex gap-2 justify-center items-center cursor-pointer">
          {user?.accountType! > 0 && (
            <IconEdit onClick={() => onEdit(element._id!)} />
          )}
          {/* {user?.accountType! > 1 && <IconTrash />} */}
        </Table.Td>
      </Table.Tr>
    ))
  }, [isLoading, companies])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="w-full h-fit mt-5 px-14">
        <Button
          variant="outline"
          className="w-fit float-right"
          size="sm"
          onClick={onAddCompany}
        >
          Add Company
        </Button>
      </div>

      <div className="w-full px-14 mt-2">
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
