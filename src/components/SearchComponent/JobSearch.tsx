import { useQuery } from '@tanstack/react-query'

import { useDebouncedValue } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { Job, JobPagination, SearchParameter } from '../../types'
import { jobServices } from '../../services'
import { Filter } from './Filter'
import { JobList } from '../JobList'

export const JobSearch = ({ keyword }: { keyword: string }) => {
  const [jobs, setJobs] = useState<Array<Job>>([])
  const [jobPagination, setJobPagination] = useState<JobPagination>({
    page: 1,
  })

  const [searchParameter, setSearchParameter] = useState<SearchParameter>({})
  const debouncedSearchKeyword = useDebouncedValue(keyword, 500)

  useEffect(() => {
    resetPage()
  }, [keyword])

  useQuery({
    queryKey: [
      'jobsSearch',
      searchParameter,
      jobPagination.page,
      debouncedSearchKeyword,
    ],
    queryFn: () =>
      keyword
        ? jobServices
            .getJobSearch({
              searchParameter,
              page: jobPagination?.page,
              keyword,
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
        : jobServices
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

  const onChangeParameter = (name: string, value: string) => {
    setSearchParameter((prev) => {
      return { ...prev, [name]: value }
    })
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

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Filter
        searchParameter={searchParameter}
        onChangeParameter={onChangeParameter}
        onResetFilter={onResetFilter}
      />

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
