import { IconPencil } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

import { useAppProviderCtx } from '../../app-provider'
import { userServices } from '../../services'
import { ResponseWrapper } from '../../types'
import { InformationField } from '../../ui'

const MyProfile = () => {
  const {
    data: { userProfile, user },
    func: { updateUserProfile },
  } = useAppProviderCtx()

  useQuery({
    queryKey: ['userProfile'],
    queryFn: () =>
      userServices.getProfile().then((res: ResponseWrapper) => {
        if (res.result) updateUserProfile(res.result)
        return res.result
      }),
  })

  if (!userProfile || !user) return <></>
  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="w-full px-16">
        <InformationField
          label="First Name:"
          value={userProfile!.firstName || ''}
          actionComponent={<IconPencil />}
        />

        <InformationField
          label="Last Name:"
          value={userProfile!.lastName || ''}
        />

        <InformationField label="Email: " value={user!.email || ''} />
        <InformationField label="Title: " value={userProfile!.title || ''} />
        <InformationField
          label="Sign-up Date: "
          value={user!.signupDate.toString() || ''}
        />
        <InformationField
          label="Access Level: "
          value={user!.accountType || ''}
        />
        <InformationField
          label="Account Status: "
          value={user!.accountStatus || ''}
        />
        <InformationField
          label="Email Authenticated: "
          value={user!.isEmailAuthenticated.toString().toUpperCase() || ''}
        />
      </div>
    </div>
  )
}

export default MyProfile
