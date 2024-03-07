import { useForm, Controller } from 'react-hook-form'
import { useEffect } from 'react'
import { Button, Select, Image } from '@mantine/core'
import { LabelInput } from '../../ui'
import moment from 'moment'
import { User } from '../../types'

type UserFormProps = {
  onSubmit: (value: any) => void
  user?: User
}

const UserForm = ({ onSubmit, user }: UserFormProps) => {
  const methods = useForm({})
  const { register, handleSubmit, reset, formState, control } = methods
  console.log(user)
  const { isDirty } = formState

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.profile?.firstName,
        lastName: user.profile?.lastName,
        title: user.profile?.title,
        email: user.email,
        isEmailAuthenticated: user.isEmailAuthenticated,
        accountStatus: user.accountStatus,
        provider: user.provider,
      })
    }
  }, [user])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full p-6 max-w-screen-lg space-y-4">
        {user && user!.profile?.profilePicture?.profileLink && (
          <div className="flex w-full justify-between items-center my-6">
            <div className="flex items-center  w-full">
              <p className="mr-2 w-1/3 text-right font-semibold">
                Profile Image:
              </p>
              <div className="w-full">
                <Image
                  src={user!.profile?.profilePicture.profileLink}
                  w={80}
                  h={80}
                  className="ml-3"
                  fallbackSrc="https://placehold.co/600x400?text=Placeholder"
                />
              </div>
            </div>
            <div className="flex gap-3"></div>
          </div>
        )}

        <LabelInput label="First Name:" name="firstName" register={register} />
        <LabelInput label="Last name:" name="lastName" register={register} />
        <LabelInput label="Title:" name="title" register={register} />
        <LabelInput label="Email:" name="email" register={register} />
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center w-full">
            <p className="mr-2 w-1/3 text-right font-semibold">
              Account Status:
            </p>
            <Controller
              name="accountStatus"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  placeholder="Account Status"
                  data={[
                    {
                      value: 'active',
                      label: 'Active',
                    },
                    {
                      value: 'inactive',
                      label: 'Inactive',
                    },
                  ]}
                  className="w-full"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div></div>
        </div>

        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center w-full">
            <p className="mr-2 w-1/3 text-right font-semibold">
              Email Authenticated:
            </p>
            <Controller
              name="isEmailAuthenticated"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  placeholder="Account Status"
                  data={[
                    {
                      value: 'true',
                      label: 'TRUE',
                    },
                    {
                      value: 'false',
                      label: 'FALSE',
                    },
                  ]}
                  className="w-full"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div></div>
        </div>

        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center w-full">
            <p className="mr-2 w-1/3 text-right font-semibold">
              Sign-Up Method:
            </p>
            <Controller
              name="provider"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  placeholder="Sign up method"
                  data={[
                    {
                      value: 'local',
                      label: 'Local',
                    },
                    {
                      value: 'google',
                      label: 'Google',
                    },
                    {
                      value: 'linkedin',
                      label: 'Linkedin',
                    },
                  ]}
                  className="w-full"
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </div>
          <div></div>
        </div>

        {user && (
          <>
            <div className="flex w-full justify-between items-center my-6">
              <div className="flex items-center w-full">
                <p className="mr-2 w-1/3 text-right font-semibold">
                  Last Login:
                </p>
                <p className="text-lg ml-3 w-full">
                  {moment(user!.updatedAt).format('MM/DD/YYYY')}
                </p>
              </div>
              <div></div>
            </div>
            <div className="flex w-full justify-between items-center my-6">
              <div className="flex items-center w-full">
                <p className="mr-2 w-1/3 text-right font-semibold">
                  Sign-Up Date:
                </p>
                <p className="text-lg ml-3 w-full">
                  {moment(user!.signupDate).format('MM/DD/YYYY')}
                </p>
              </div>
              <div></div>
            </div>
          </>
        )}
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

export default UserForm
