import { IconChevronLeft } from '@tabler/icons-react'

import { useNavigate } from 'react-router-dom'
import { companyServices } from '../../services'
import { toast } from '../../lib/toast'
import { CompanyForm } from '../../components/CompanyForm'

const CreateCompanyPage = () => {
  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }

  const onSubmit = async (value: any) => {
    try {
      const file = value.companyLogo
      const imageLogoUrl = await companyServices.getImageLogoUrl(file)
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
        logo: imageLogoUrl?.result?.url ? imageLogoUrl?.result.url : '',
      }
      await companyServices
        .createCompany(company)
        .then((result) => {
          result && toast.success('Company is created successfully')
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
        <CompanyForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default CreateCompanyPage
