import { IconChevronLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

import { skillServices } from '../../services'
import { toast } from '../../lib/toast'
import SkillForm from './SkillForm'

const CreateSkillPage = () => {
  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }

  const onSubmit = async (value: any) => {
    try {
      const skill = {
        skillName: value.skillName,
        skillCategory: value.skillCategory,
        skillStatus: value.skillStatus,
        functionalArea: value.functionalArea,
      }
      await skillServices
        .createSkill(skill)
        .then((result) => {
          result && toast.success('Skill is created successfully')
          onBack()
        })
        .catch((error) => {
          toast.error(error.message)
        })
    } catch (e: any) {
      toast.error(e.message)
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
        <SkillForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default CreateSkillPage
