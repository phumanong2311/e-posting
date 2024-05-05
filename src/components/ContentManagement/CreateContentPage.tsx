import { IconChevronLeft } from '@tabler/icons-react'
import { useNavigate } from 'react-router-dom'

import { contentManagementService } from '../../services'
import { toast } from '../../lib/toast'
import ContentForm from './ContentForm'

const CreateContentPage = () => {
  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }

  const onSubmit = async (value: any) => {
    try {
      const file = value.displayImage
      const imageLogoUrl = await contentManagementService.getImageLogoUrl(file)
      const content = {
        title: value.title,
        contentType: value.contentType,
        tagline: value.tagline,
        description: value.description,
        publicationName: value.publicationName,
        sourceUrl: value.sourceUrl,
        displayImage: imageLogoUrl?.result?.url ? imageLogoUrl?.result.url : '',
        imageSourceCitation: value.imageSourceCitation,
        category: value.category,
        endDate: value.endDate,
        publishDate: value.publishDate,
        mediaStatus: value.mediaStatus,
      }
      await contentManagementService
        .create(content)
        .then((result) => {
          result && toast.success('Content is created successfully')
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
        <ContentForm onSubmit={onSubmit} />
      </div>
    </div>
  )
}

export default CreateContentPage
