import { IconChevronLeft } from '@tabler/icons-react'
import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

import { toast } from '../../lib/toast'
import { userServices } from '../../services'
import { User } from '../../types'
import UserForm from './UserForm'

const EditUserPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }

  const [userDetail, setUserDetail] = useState<User>()

  useQuery({
    queryKey: [id],
    queryFn: () =>
      userServices.getUserDetail(id!).then((res) => {
        if (res.result) {
          setUserDetail(res.result)
          return res.result
        }
        return null
      }),
  })

  const onSubmit = async (value: any) => {
    await userServices
      .editUser(id!, value)
      .then((result) => {
        result && toast.success('User is edited successfully')
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
        <UserForm onSubmit={onSubmit} user={userDetail} />
      </div>
    </div>
  )
}

export default EditUserPage
