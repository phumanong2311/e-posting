import { useState } from 'react'
import { IconChevronLeft } from '@tabler/icons-react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import { companyServices } from '../../services'
import { toast } from '../../lib/toast'
import { Company } from '../../types'
import CompanyForm from './CompanyForm'

const EditCompanyPage = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }

  const [companyDetail, setCompanyDetail] = useState<Company>()

  useQuery({
    queryKey: [id],
    queryFn: () =>
      companyServices.getCompanyDetail(id!).then((res) => {
        if (res.result) {
          setCompanyDetail(res.result)
          return res.result
        }
        return null
      }),
  })

  const onSubmit = async (value: any) => {
    const company = {
      companyName: value.companyName,
      ticker: value.ticker,
      address: value.address,
      city: value.city,
      state: value.state,
      postalCode: value.postalCode,
      country: value.country,
      website: value.website,
      sector: value.sector,
      industry: value.industry,
      companyCeo: value.companyCeo,
      logo: value.logo,
    }

    if (typeof value.companyLogo !== 'string') {
      const file = value.companyLogo
      const imageLogoUrl = await companyServices.getImageLogoUrl(file)
      company.logo = imageLogoUrl.url ? imageLogoUrl.url : ''
    }

    await companyServices
      .editCompany(id!, value)
      .then((result) => {
        result && toast.success('Company is edited successfully')
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
        <CompanyForm onSubmit={onSubmit} company={companyDetail} />
      </div>
    </div>
  )
}

export default EditCompanyPage
