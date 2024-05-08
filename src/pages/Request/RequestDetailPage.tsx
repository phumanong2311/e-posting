import { IconChevronLeft, IconPencil, IconTrash } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { requestServices } from '../../services'
import { Request, paths } from '../../types'
import { InformationField } from '../../ui'
import { toast } from '../../lib/toast'

const RequestDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
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

  const onBack = () => {
    navigate(-1)
  }

  const onEdit = () => {
    navigate(
      `/${paths.ROOT}/${paths.DASHBOARD}/${paths.EDIT_REQUEST}/${
        requestDetail!._id
      }`
    )
  }

  const onDelete = async () => {
    await requestServices
      .deleteRequest(id!)
      .then((result) => {
        result && toast.success('Request is deleted successfully')
        onBack()
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  if (!requestDetail) return <></>
  return (
    <div className="w-full flex justify-center items-center mt-10 pb-[100px]">
      <div className="w-full px-16">
        <p
          className="flex text-lg items-center w-full justify-end text-purple-500 cursor-pointer "
          onClick={() => onBack()}
        >
          <IconChevronLeft /> back to list
        </p>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center" />
          <div className="flex gap-3">
            <>
              <IconPencil className="cursor-pointer" onClick={() => onEdit()} />
              <IconTrash
                className="cursor-pointer"
                onClick={() => onDelete()}
              />
            </>
          </div>
        </div>
        <InformationField
          label="Owner: "
          value={requestDetail.company ? requestDetail.company : ''}
        />
        <InformationField
          label="Title: "
          value={requestDetail.requestTitle ? requestDetail.requestTitle : ''}
        />
        <InformationField
          label="Company: "
          value={requestDetail.company ? requestDetail.company : ''}
        />
        <InformationField
          label="Country: "
          value={requestDetail.country ? requestDetail.country : ''}
        />
        <InformationField
          label="State(division): "
          value={requestDetail.division ? requestDetail.division : ''}
        />
        <InformationField
          label="City: "
          value={requestDetail.city ? requestDetail.city : ''}
        />
        <InformationField
          label="Workplace Type(worklocationType): "
          value={
            requestDetail.workLocationType ? requestDetail.workLocationType : ''
          }
        />
        <InformationField
          label="Employment Type: "
          value={
            requestDetail.employmentType ? requestDetail.employmentType : ''
          }
        />
        <InformationField
          label="Minimum Salary: "
          value={requestDetail.minimumSalary ? requestDetail.minimumSalary : ''}
        />
        <InformationField
          label="Total Compensation: "
          value={
            requestDetail.totalCompensation
              ? requestDetail.totalCompensation
              : ''
          }
        />
        <InformationField
          label="Cover Letter: "
          value={requestDetail.coverLetter ? requestDetail.coverLetter : ''}
        />
        <InformationField
          label="Closing Date: "
          value={requestDetail.closingDate ? requestDetail.closingDate : ''}
        />
        <InformationField
          label="User Summary: "
          value={requestDetail.userSummary ? requestDetail.userSummary : ''}
        />
        <InformationField
          label="Skills: "
          value={requestDetail.skills ? requestDetail.skills.toString() : ''}
        />
        <InformationField
          label="Visible To: "
          value={requestDetail.visibleTo ? requestDetail.visibleTo : ''}
        />
      </div>
    </div>
  )
}

export default RequestDetailPage
