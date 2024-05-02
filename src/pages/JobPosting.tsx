import { IconChevronLeft, IconPencil, IconTrash } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { JobsPostingDetail } from '../components/JobPosting'
import { useNavigate, useParams } from 'react-router-dom'
import jobService from '../services/job.service'
import { Job, paths } from '../types'
import { toast } from '../lib/toast'
import { useAppProviderCtx } from '../app-provider'

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

  return <JobsPostingDetail jobDetail={jobDetail} />
}

export default JobPosting
