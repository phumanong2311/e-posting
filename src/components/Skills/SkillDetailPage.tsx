import { Image } from '@mantine/core'
import { IconChevronLeft, IconPencil } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { skillServices } from '../../services'
import { Skill, paths } from '../../types'
import { InformationField } from '../../ui'

const SkillDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
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

  const onBack = () => {
    navigate(-1)
  }

  const onEdit = () => {
    navigate(`/${paths.ROOT}/${paths.SKILLS_EDIT}/${id}`)
  }

  if (!skillDetail) return <></>
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
          <InformationField
            label="Skill Name: "
            value={skillDetail?.skillName || ''}
          />
          <div className="flex gap-3">
            <>
              <IconPencil className="cursor-pointer" onClick={() => onEdit()} />
            </>
          </div>
        </div>

        <InformationField
          label="Skill Category: "
          value={skillDetail.skillCategory || ''}
        />
        <InformationField
          label="Functional Area: "
          value={skillDetail.functionalArea || ''}
        />
        <InformationField
          label="Number Of Uses: "
          value={skillDetail.numberOfUses || 0}
        />
        <InformationField
          label="Skill Status: "
          value={skillDetail.skillStatus || ''}
        />
      </div>
    </div>
  )
}

export default SkillDetailPage
