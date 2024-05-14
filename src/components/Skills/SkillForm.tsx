import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { Button } from '@mantine/core'
import { LabelInput, ImageInput } from '../../ui'
import { Skill } from '../../types'

type SkillFormProps = {
  onSubmit: (value: any) => void
  skill?: Skill
}

const SkillForm = ({ onSubmit, skill }: SkillFormProps) => {
  const methods = useForm({})
  const { register, handleSubmit, reset, formState, control } = methods

  const { isDirty } = formState

  useEffect(() => {
    if (skill) {
      reset({
        ...skill,
      })
    }
  }, [skill])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full p-6 max-w-screen-lg space-y-4">
        <LabelInput label="Skill Name:" name="skillName" register={register} />
        <LabelInput
          label="Functional Area:"
          name="functionalArea"
          register={register}
        />
        <LabelInput
          label="Skill Category:"
          name="skillCategory"
          register={register}
        />
        <LabelInput label="Status:" name="status" register={register} />
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

export default SkillForm
