import { IconChevronLeft, IconPencil, IconTrash } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import jobService from '../../services/job.service'
import { Job, paths } from '../../types'
import { toast } from '../../lib/toast'
import { isHTML } from '../../utils'

const InformationField = ({
  label,
  value,
  valueClassName = '',
  actionComponent = <></>,
}: {
  label: string
  value: string
  valueClassName: string
  actionComponent?: JSX.Element
}) => {
  const renderValue = () =>
    isHTML(value) ? (
      <p
        className={`text-lg ml-3 ${valueClassName}`}
        dangerouslySetInnerHTML={{ __html: value }}
      ></p>
    ) : (
      <p className={`text-lg ml-3 ${valueClassName}`}>{value}</p>
    )
  return (
    <div className="flex w-full justify-between items-center my-6">
      <div className="flex">
        <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
          {label}
        </p>
        {renderValue()}
      </div>
      <div className="flex gap-3">{actionComponent}</div>
    </div>
  )
}

const JobsPostingDetail = ({
  jobDetail,
  isMyJobPosting = false,
}: {
  jobDetail: Job
  isMyJobPosting: boolean
}) => {
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
    await jobService
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
            valueClassName="font-bold"
            actionComponent={
              isMyJobPosting && (
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
          valueClassName="font-bold"
          actionComponent={
            isMyJobPosting && (
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

        <InformationField label="Required Skills: " value={jobDetail!.skills} />
      </div>
    </div>
  )
}

export default JobsPostingDetail
