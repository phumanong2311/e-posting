import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { Button } from '@mantine/core'
import { LabelInput, ImageInput } from '../../ui'
import { Company } from '../../types'

type CompanyFormProps = {
  onSubmit: (value: any) => void
  company?: Company
}

const CompanyForm = ({ onSubmit, company }: CompanyFormProps) => {
  const methods = useForm({})
  const { register, handleSubmit, reset, formState, control } = methods

  const { isDirty } = formState

  useEffect(() => {
    if (company) {
      reset({
        ...company,
        companyLogo: company.logo,
      })
    }
  }, [company])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full p-6 max-w-screen-lg space-y-4">
        <Controller
          name="companyLogo"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ImageInput
              label="Company Logo:"
              name="companyLogo"
              register={register}
              onChange={onChange}
              value={value}
            />
          )}
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
        <LabelInput label="Company CEO:" name="companyCeo" register={register} />
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
  )
}

export default CompanyForm
