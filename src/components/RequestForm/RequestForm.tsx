import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { Button, Select, Image } from '@mantine/core'
import { LabelInput, RichEditor } from '../../ui'
import moment from 'moment'
import { Request } from '../../types'

type RequestFormProps = {
  onSubmit: (value: any) => void
  request?: Request
}

const RequestForm = ({ onSubmit, request }: RequestFormProps) => {
  const methods = useForm({})
  const { register, handleSubmit, reset, formState, control } = methods
  const { isDirty } = formState

  useEffect(() => {
    if (request) {
      reset({
        companyTitle: request?.requestTitle || '',
        company: request.company || '',
        country: request.country || '',
        city: request.city || '',
        division: request.division || '',
        workLocationType: request.workLocationType || '',
        minimumSalary: request.minimumSalary || 0,
        totalCompensation: request.totalCompensation || '',
        coverLetter: request.coverLetter || '',
        userSummary: request.userSummary || '',
        skills: request.skills || '',
        visibleTo: request.visibleTo || '',
      })
    }
  }, [request])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full p-6 max-w-screen-lg space-y-4">
        <LabelInput label="Title:" name="companyTitle" register={register} />
        <LabelInput label="Company:" name="company" register={register} />
        <LabelInput label="Country:" name="country" register={register} />
        <LabelInput label="City:" name="city" register={register} />
        <LabelInput label="State:" name="division" register={register} />

        <LabelInput
          label="Workplace type: "
          name="workLocationType"
          register={register}
        />
        <LabelInput
          label="Minimum Salary:"
          name="minimumSalary"
          register={register}
        />
        <LabelInput
          label="Total Compensation: "
          name="totalCompensation"
          register={register}
        />

        <LabelInput label="Salary:" name="minimumSalary" register={register} />
        <LabelInput
          label="Total Compensation: "
          name="totalCompensation"
          register={register}
        />

        <div className="flex w-full my-6">
          <Controller
            name="coverLetter"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RichEditor
                name="coverLetter"
                label="Cover Letter: "
                labelClass="font-bold text-lg text-right max-w-[300px]"
                className="w-full rounded-md min-h-[50px]"
                wrapperClass="w-full"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>

        <div className="flex w-full my-6">
          <Controller
            name="userSummary"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RichEditor
                name="userSummary"
                label="User summary: "
                labelClass="font-bold text-lg text-right max-w-[300px]"
                className="w-full rounded-md min-h-[50px]"
                wrapperClass="w-full"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </div>
        <LabelInput label="Skills:" name="skills" register={register} />
        <LabelInput label="Visible to:" name="visibleTo" register={register} />
      </div>

      <div className="flex justify-end gap-5 items-center">
        <Button
          type="submit"
          className={`rounded-lg border-1 cursor-pointer ${
            !isDirty ? 'border-red-200 text-gray-300' : ''
          }`}
          title="Save"
          variant="outline"
          size="sm"
        >
          Save
        </Button>
      </div>
    </form>
  )
}

export default RequestForm
