import { useState } from 'react'
import { IconChevronLeft } from '@tabler/icons-react'

import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { requestService } from '../../services'
import { toast } from '../../lib/toast'
import { RequestForm } from '../../components/RequestForm'
import { Request } from '../../types'

const EditRequestPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }

  const [requestDetail, setRequestDetail] = useState<Request>()

  useQuery({
    queryKey: [id],
    queryFn: () =>
      requestService.getRequestDetail(id!).then((res) => {
        if (res.result) {
          setRequestDetail(res.result)
          return res.result
        }
        return null
      }),
  })

  const onSubmit = async (value: any) => {
    await requestService
      .editRequest(id!, value)
      .then((result) => {
        result && toast.success('Request is edited successfully')
        onBack()
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  return (
    <div className="w-full flex justify-center items-center mt-10 pb-[100px]">
      <div className="w-full px-16">
        <p
          className="flex text-lg items-center w-full justify-end text-purple-500 cursor-pointer "
          onClick={() => onBack()}
        >
          <IconChevronLeft /> back to list
        </p>
        <RequestForm onSubmit={onSubmit} request={requestDetail} />
      </div>
    </div>
  )
}

export default EditRequestPage
