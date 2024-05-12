import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useParams } from 'react-router-dom'
import { JobRequestDetail } from '../JobRequest'
import { requestServices } from '../../services'
import { Request } from '../../types'

const MyJobRequestDetailPage = () => {
  const { id } = useParams()
  const [requestDetail, setRequestDetail] = useState<Request>()

  useQuery({
    queryKey: [id],
    queryFn: () =>
      requestServices.getRequestDetail(id!).then((res) => {
        if (res.result) {
          setRequestDetail(res.result)
          return res.result
        }
        return null
      }),
  })
  if(!requestDetail) return null
  return <JobRequestDetail requestDetail={requestDetail} isMyJobPosting />
}

export default MyJobRequestDetailPage
