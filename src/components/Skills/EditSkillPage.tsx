import { useState } from 'react'
import { IconChevronLeft } from '@tabler/icons-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { skillServices } from '../../services'
import { toast } from '../../lib/toast'
import { Skill } from '../../types'
import SkillForm from './SkillForm'

const EditSkillPage = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }

  const [skillDetail, setSkillDetail] = useState<Skill>()

  useQuery({
    queryKey: [id],
    queryFn: () =>
      skillServices.getSkillDetail(id!).then((res) => {
        if (res.result) {
          setSkillDetail(res.result)
          return res.result
        }
        return null
      }),
  })

  const onSubmit = async (value: any) => {
    const skill = {
      skillName: value.skillName,
      skillCategory: value.skillCategory,
      skillStatus: value.skillStatus,
      functionalArea: value.functionalArea,
    }
    await skillServices
      .editSkill(id!, value)
      .then((result) => {
        result && toast.success('Skill is edited successfully')
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
        <SkillForm onSubmit={onSubmit} skill={skillDetail} />
      </div>
    </div>
  )
}

export default EditSkillPage
