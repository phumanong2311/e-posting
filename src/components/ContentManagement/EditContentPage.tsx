import { IconChevronLeft } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { toast } from '../../lib/toast'
import { contentManagementServices } from '../../services'
import { ContentPayload } from '../../types'
import ContentForm from './ContentForm'

const EditContentPage = () => {
  const { id } = useParams()

  const navigate = useNavigate()
  const onBack = () => {
    navigate(-1)
  }

  const [contentDetail, setContentDetail] = useState<ContentPayload>()

  useQuery({
    queryKey: [id],
    queryFn: () =>
      contentManagementServices.getDetail(id!).then((res) => {
        if (res.result) {
          setContentDetail(res.result)
          return res.result
        }
        return null
      }),
  })

  const onSubmit = async (value: ContentPayload) => {
    const content: ContentPayload = {
      title: value.title,
      contentType: value.contentType,
      tagline: value.tagline,
      imageSource: value.imageSource,
      description: value.description,
      publisherName: value.publisherName,
      imageSourceCitation: value.imageSourceCitation,
      authorName: value.authorName,
      authorTitle: value.authorTitle,
      authorBio: value.authorBio,
      category: value.category,
      endDate: value.endDate,
      publishDate: value.publishDate,
      mediaStatus: value.mediaStatus,
    }

    if (typeof value.displayImage !== 'string' && value.displayImage) {
      const file = value.displayImage
      const imageLogoUrl = await contentManagementServices.getImageLogoUrl(file)
      if (imageLogoUrl) {
        content.displayImage = imageLogoUrl?.result?.url
          ? imageLogoUrl?.result?.url
          : ''
      }
    }

    if (typeof value.authorImage !== 'string' && value.authorImage) {
      const file = value.authorImage
      const authorImageUrl = await contentManagementServices.getImageLogoUrl(
        file
      )
      if (authorImageUrl) {
        content.authorImage = authorImageUrl?.result?.url
          ? authorImageUrl?.result?.url
          : ''
      }
    }

    await contentManagementServices
      .edit(id!, content)
      .then((result) => {
        result && toast.success('Content is edited successfully')
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
        <ContentForm onSubmit={onSubmit} content={contentDetail} />
      </div>
    </div>
  )
}

export default EditContentPage
