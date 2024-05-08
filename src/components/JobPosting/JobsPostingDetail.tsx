import { IconChevronLeft, IconPencil, IconTrash } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

import { toast } from '../../lib/toast'
import { jobServices } from '../../services'
import { Job, paths } from '../../types'
import { InformationField } from '../../ui'

interface IJobsPostingDetailJob {
  jobDetail: Job
  isMyJobPosting: boolean
}

const JobsPostingDetail = ({
  jobDetail,
  isMyJobPosting = false,
}: IJobsPostingDetailJob) => {
  const navigate = useNavigate()

  const onBack = () => {
    navigate(-1)
  }

  const onEdit = () => {
    navigate(
      `/${paths.ROOT}/${paths.DASHBOARD}/${paths.EDIT_JOB_POSTING}/${
        jobDetail!._id
      }`
    )
  }

  const deletePost = async () => {
    await jobServices
      .deleteJob(jobDetail!._id)
      .then((res) => {
        if (res) {
          toast.success('Job posting deleted successfully')
          onBack()
        }
      })
      .catch((error) => {
        toast.error(error.message)
      })
  }

  if (!jobDetail) return <></>
  return (
    <div className="w-full flex justify-center items-center mt-10 pb-[100px]">
      <div className="w-full px-16">
        <p
          className="flex text-lg items-center w-full justify-end text-purple-500 cursor-pointer "
          onClick={() => onBack()}
        >
          <IconChevronLeft /> Back to list
        </p>

        {!isMyJobPosting && (
          <InformationField
            label="Owner: "
            value={jobDetail!.jobOwner}
            className="font-bold"
            actionComponent={
              (
                <>
                  <IconPencil
                    className="cursor-pointer"
                    onClick={() => onEdit()}
                  />
                  <IconTrash className="cursor-pointer" onClick={deletePost} />
                </>
              )
            }
          />
        )}

        <InformationField
          label="Job Title:"
          value={jobDetail!.jobTitle}
          className="font-bold"
          actionComponent={
            (
              <>
                <IconPencil
                  className="cursor-pointer"
                  onClick={() => onEdit()}
                />
                <IconTrash className="cursor-pointer" onClick={deletePost} />
              </>
            )
          }
        />

        <InformationField label="Company: " value={jobDetail!.company} />

        <InformationField label="City:" value={jobDetail!.city} />

        <InformationField label="State: " value={jobDetail!.state} />

        <InformationField
          label="Workplace Type: "
          value={jobDetail!.workLocationType}
        />

        <InformationField
          label="Employment Type: "
          value={jobDetail!.employmentType}
        />

        <InformationField
          label="Required years of experience: "
          value={jobDetail!.yearsOfExperience}
        />

        <InformationField label="Salary: " value={jobDetail!.baseSalary} />

        <InformationField
          label="Total Comp: "
          value={jobDetail!.totalCompensation}
        />

        <InformationField
          label="Closing Date: "
          value={jobDetail!.closingDate}
        />

        <InformationField
          label="Job Description: "
          value={jobDetail!.description}
        />

        <InformationField label="Required Skills: " value={jobDetail.skills && jobDetail.skills.toString()} />
      </div>
    </div>
  )
}

export default JobsPostingDetail
