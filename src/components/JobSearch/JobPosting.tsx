import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useParams } from 'react-router-dom'
import { jobServices } from '../../services'
import { Job } from '../../types'
import JobsPostingDetail from './JobsPostingDetail'

const JobPosting = () => {
  const { id } = useParams()
  const [jobDetail, setJobDetail] = useState<Job>()

  useQuery({
    queryKey: [id],
    queryFn: () =>
      jobServices.getJobDetail({ jobId: id }).then((res) => {
        if (res.result) {
          setJobDetail(res.result)
          return res.result
        }
        return null
      }),
  })
  if (!jobDetail) return <></>
  return <JobsPostingDetail jobDetail={jobDetail} />
}

export default JobPosting
