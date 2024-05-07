import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import jobService from '../../services/job.service'
import { Job, JobPagination } from '../../types'
import { JobList } from '../JobList'

const MyJobPostingsPage = () => {
  const [jobs, setJobs] = useState<Array<Job>>([])
  const [jobPagination, setJobPagination] = useState<JobPagination>({
    page: 1,
  })

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

  return (
    <div className="w-full">
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
