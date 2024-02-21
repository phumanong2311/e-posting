import { IconChevronLeft } from '@tabler/icons-react'
import { useForm } from 'react-hook-form'

import { Button } from '@mantine/core'
import { useNavigate } from 'react-router-dom'
import { LabelInput } from '../ui'
import { ImageInput } from '../ui/ImageInput'

const CreateCompanyPage = () => {
  const navigate = useNavigate()

  const methods = useForm({})
  const { register, handleSubmit, reset, formState, control } = methods

  const { isDirty } = formState

  const onBack = () => {
    navigate(-1)
  }

  const onSubmit = async (value: any) => {
    if (isDirty) {
      // await jobService
      //   .editJob(id!, value)
      //   .then((result) => {
      //     result && toast.success('Job posting updated successfully')
      //     onBack()
      //   })
      //   .catch((error) => {
      //     toast.error(error.message)
      //   })
    }
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full p-6 max-w-screen-lg space-y-4">
            <ImageInput
              label="Company Logo:"
              name="companyLogo"
              register={register}
            />
            <LabelInput
              label="Company Name:"
              name="companyName"
              register={register}
            />
            <LabelInput label="City:" name="city" register={register} />
            <LabelInput label="State:" name="state" register={register} />
            <LabelInput label="Country:" name="country" register={register} />
            <LabelInput label="Address:" name="address" register={register} />
            <LabelInput
              label="Postal Code:"
              name="postalCode"
              register={register}
            />
            <LabelInput label="Website:" name="website" register={register} />
            <LabelInput label="Ticker:" name="ticker" register={register} />
            <LabelInput label="Company CEO:" name="ceo" register={register} />
            <LabelInput label="Sector:" name="sector" register={register} />
            <LabelInput label="Industry:" name="industry" register={register} />
            <LabelInput
              label="Record Status:"
              name="companyStatus"
              register={register}
            />
            <LabelInput
              label="Created date:"
              name="createdDate"
              register={register}
            />
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
      </div>
    </div>
  )
}

export default CreateCompanyPage
