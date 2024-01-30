import { Button, Table } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

import { useDebouncedValue } from '@mantine/hooks'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { SyntheticEvent, useState } from 'react'
import { useAppProviderCtx } from '../app-provider/AppProvider'
import { Action, Filter } from '../components/SearchComponent'
import jobService from '../services/job.service'
import { Job, JobPagination, SearchParameter, SearchType } from '../types'

const SearchPage = () => {
  const navigate = useNavigate()
  const {
    data: { user },
  } = useAppProviderCtx()
  const [jobs, setJobs] = useState<Array<Job>>([])
  const [jobPagination, setJobPagination] = useState<JobPagination>({
    page: 1,
  })

  const [searchType, setSearchType] = useState<SearchType>(SearchType.Jobs)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [searchParameter, setSearchParameter] = useState<SearchParameter>({})
  const debouncedSearchKeyword = useDebouncedValue(searchKeyword, 500)

  useQuery({
    queryKey: [
      'jobsSearch',
      searchParameter,
      jobPagination.page,
      debouncedSearchKeyword,
    ],
    queryFn: () =>
      searchKeyword
        ? jobService
            .getJobSearch({
              searchParameter,
              page: jobPagination?.page,
              keyword: searchKeyword,
            })
            .then((res) => {
              if (res.result) {
                const { jobs, ...pagination } = res.result
                setJobs(jobs)
                setJobPagination(pagination)
                return res.result
              }
              return null
            })
        : jobService
            .getJobs({
              searchParameter,
              page: jobPagination?.page,
            })
            .then((res) => {
              if (res.result) {
                const { jobs, ...pagination } = res.result
                setJobs(jobs)
                setJobPagination(pagination)
                return res.result
              }
              return null
            }),
  })

  const onChangeSearchType = (e: SyntheticEvent<HTMLInputElement, Event>) => {
    if (!e.target) return
    const value = (e.target as HTMLInputElement).value as SearchType
    setSearchType(value)
    resetPage()
  }

  const onChangeParameter = (name: string, value: string) => {
    setSearchParameter((prev) => {
      return { ...prev, [name]: value }
    })
    resetPage()
  }

  const onChangeSearchKeyword = (
    e: SyntheticEvent<HTMLInputElement, Event>
  ) => {
    if (!e?.target) return
    const { value } = e.target as HTMLInputElement
    setSearchKeyword(value)
    resetPage()
  }

  const onResetFilter = () => {
    setSearchParameter({
      workLocationType: '',
      employmentType: '',
      yearsOfExperience: '',
      closingDate: '',
    })
    resetPage()
  }

  const resetPage = () => {
    setJobPagination((prev) => ({ ...prev, page: 1 }))
  }

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
    navigate(`/admin/dashboard/job-postings/${id}`)
  }

  const onEdit = (id: string) => {
    navigate(`/admin/dashboard/edit-job-posting/${id}`, {
      state: { isFromSearchPage: true },
    })
  }

  const rows = jobs.map((element, index) => (
    <Table.Tr key={index}>
      <Table.Td
        className="text-ellipsis cursor-pointer"
        onClick={() => onViewDetail(element._id)}
      >
        {element.jobTitle}
      </Table.Td>
      <Table.Td className="text-center">{element.jobOwner}</Table.Td>
      <Table.Td className="text-center">{element.createdAt}</Table.Td>
      <Table.Td className="text-center">{element.jobPostStatus}</Table.Td>
      <Table.Td className="flex gap-2 justify-center items-center cursor-pointer">
        {user?.accountType! > 0 && (
          <IconEdit onClick={() => onEdit(element._id)} />
        )}
        {user?.accountType! > 1 && <IconTrash />}
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Action
        searchType={searchType}
        searchKeyword={searchKeyword}
        onChangeSearchKeyword={onChangeSearchKeyword}
        onChangeSearchType={onChangeSearchType}
      />

      <Filter
        searchParameter={searchParameter}
        onChangeParameter={onChangeParameter}
        onResetFilter={onResetFilter}
      />

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
  )
}

export default SearchPage
