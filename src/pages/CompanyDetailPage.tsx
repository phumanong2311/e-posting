import { IconChevronLeft, IconPencil, IconTrash } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { Image } from '@mantine/core'

import { useNavigate, useParams } from 'react-router-dom'
import { companyService } from '../services'
import { Company, paths } from '../types'
import { toast } from '../lib/toast'
import { useAppProviderCtx } from '../app-provider'

const CompanyDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [companyDetail, setCompanyDetail] = useState<Company>()

  useQuery({
    queryKey: [id],
    queryFn: () =>
      companyService.getCompanyDetail(id).then((res) => {
        if (res.result) {
          setCompanyDetail(res.result)
          return res.result
        }
        return null
      }),
  })

  const onBack = () => {
    navigate(-1)
  }

  const onEdit = () => {
    //TODO: navigate to edit company details
    // navigate(
    //   `/${paths.ROOT}/${paths.EDIT_JOB_POSTING}/${
    //     companyDetail!._id
    //   }`
    // )
  }

  const deletePost = async () => {
    //TODO: Delete company details
    // await jobService
    //   .deleteJob(id!)
    //   .then((res) => {
    //     if (res) {
    //       toast.success('Job posting deleted successfully')
    //       onBack()
    //     }
    //   })
    //   .catch((error) => {
    //     toast.error(error.message)
    //   })
  }

  if (!companyDetail) return <></>
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
              Company Logo:
            </p>
            <Image src={companyDetail!.logo} w={80} h={80} className="ml-3" />
          </div>
          <div className="flex gap-3">
            <>
              <IconPencil className="cursor-pointer" onClick={() => onEdit()} />
              <IconTrash className="cursor-pointer" onClick={deletePost} />
            </>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Company Name:
            </p>
            <p className="text-lg ml-3">{companyDetail!.companyName}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              City:{' '}
            </p>
            <p className="text-lg ml-3">{companyDetail!.city}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              State:{' '}
            </p>
            <p className="text-lg ml-3">{companyDetail!.state}</p>
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
              Country:
            </p>
            <p className="text-lg ml-3">{companyDetail!.country}</p>
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
              Address:
            </p>
            <p className="text-lg ml-3">{companyDetail!.address}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Postal Code:
            </p>
            <p className="text-lg ml-3">{companyDetail!.postalCode}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Website:
            </p>
            <p className="text-lg ml-3">{companyDetail!.website}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Ticker:
            </p>
            <p className="text-lg ml-3">{companyDetail!.ticker}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Company CEO:
            </p>
            <p className="text-lg ml-3">{companyDetail!.ceo}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Sector:
            </p>
            <p className="text-lg ml-3">{companyDetail!.sector}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex ">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Industry:
            </p>
            <p className="text-lg ml-3">{companyDetail!.industry}</p>
          </div>
          <div></div>
        </div>

        <div className="flex w-full justify-between items-center my-6">
          <div className="flex ">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Record Status:
            </p>
            <p className="text-lg ml-3">{companyDetail!.companyStatus}</p>
          </div>
          <div></div>
        </div>
        {/* <div className="flex w-full justify-between items-center my-6">
          <div className="flex ">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Created Date:
            </p>
            <p className="text-lg ml-3">{companyDetail!.industry}</p>
          </div>
          <div></div>
        </div> */}
      </div>
    </div>
  )
}

export default CompanyDetailPage
