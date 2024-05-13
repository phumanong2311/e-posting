import { IconChevronLeft, IconPencil, IconTrash } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Image } from '@mantine/core'
import moment from 'moment'

import { useNavigate, useParams } from 'react-router-dom'
import { userServices } from '../../services'
import { User, paths } from '../../types'

const UserDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
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

  const onBack = () => {
    navigate(-1)
  }

  const onEdit = () => {
    navigate(`/${paths.ROOT}/${paths.EDIT_USER}/${userDetail!.id}`)
  }

  const deleteUser = async () => {
  }

  if (!userDetail) return <></>
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
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Profile Image:
            </p>
            <Image
              src={userDetail!.profile?.profilePicture?.profileLink}
              w={80}
              h={80}
              className="ml-3"
              fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            />
          </div>
          <div className="flex gap-3">
            <>
              <IconPencil className="cursor-pointer" onClick={() => onEdit()} />
              <IconTrash className="cursor-pointer" onClick={deleteUser} />
            </>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              First Name:
            </p>
            <p className="text-lg ml-3">{userDetail!.profile?.firstName}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Last Name:
            </p>
            <p className="text-lg ml-3">{userDetail!.profile?.lastName}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Title:
            </p>
            <p className="text-lg ml-3">{userDetail!.profile?.title}</p>
          </div>
          <div>
            {/* <p className="text-lg ml-3 text-gray-400">
              (Job Title from profile)
            </p> */}
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Email:
            </p>
            <p className="text-lg ml-3">{userDetail!.email}</p>
          </div>
          <div>
            {/* <p className="text-lg ml-3 text-gray-400">
              (local, google, linkedin)
            </p> */}
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Account Status:
            </p>
            <p className="text-lg ml-3">{userDetail!.accountStatus}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Email Authenticated:
            </p>
            <p className="text-lg ml-3">
              {userDetail!.isEmailAuthenticated.toString().toUpperCase()}
            </p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Sign-Up Method:
            </p>
            <p className="text-lg ml-3">{userDetail!.provider}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Last Login:
            </p>
            <p className="text-lg ml-3">
              {moment(userDetail!.updatedAt).format('MM/DD/YYYY')}
            </p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Sign-Up Date:
            </p>
            <p className="text-lg ml-3">
              {moment(userDetail!.signupDate).format('MM/DD/YYYY')}
            </p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default UserDetailPage
