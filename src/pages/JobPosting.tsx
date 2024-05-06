import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useParams } from 'react-router-dom'
import { JobsPostingDetail } from '../components/JobPosting'
import jobService from '../services/job.service'
import { Job } from '../types'

const JobPosting = () => {
  const { id } = useParams()
  const [jobDetail, setJobDetail] = useState<Job>()

  useQuery({
    queryKey: [id],
    queryFn: () =>
      jobService.getJobDetail({ jobId: id }).then((res) => {
        if (res.result) {
          setJobDetail(res.result)
          return res.result
        }
        return null
      }),
  })
  if (!jobDetail) return <></>
  return <JobsPostingDetail jobDetail={jobDetail} isMyJobPosting={false} />
}

export default JobPosting
