import { Image } from '@mantine/core'
import { IconChevronLeft, IconPencil } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { contentManagementServices } from '../../services'
import { ContentType, paths } from '../../types'
import { InformationField } from '../../ui'

const ContentDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [contentDetail, setContentDetail] = useState<ContentType>()

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

  const onBack = () => {
    navigate(-1)
  }

  const onEdit = () => {
    navigate(
      `/${paths.ROOT}/${paths.CONTENT_MANAGEMENT}/${paths.EDIT_CONTENT}/${id}`
    )
  }

  if (!contentDetail) return <></>
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
              Display Image:
            </p>
            <Image
              src={contentDetail!.displayImage}
              w={80}
              h={80}
              className="ml-3"
              fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            />
          </div>
          <div className="flex gap-3">
            <>
              <IconPencil className="cursor-pointer" onClick={() => onEdit()} />
            </>
          </div>
        </div>

        <InformationField
          label="Content Type:"
          value={contentDetail.contentType}
        />
        <InformationField label="Title:" value={contentDetail.title} />
        <InformationField
          label="Tagline Display:"
          value={contentDetail.tagline ? contentDetail.tagline : ''}
        />
        <InformationField
          label="Cite image source:"
          value={contentDetail.imageSourceUrl}
        />
        <InformationField
          label="Description:"
          value={contentDetail.description || ''}
        />
        <InformationField
          label="Publication Name:"
          value={contentDetail.publisherName || ''}
        />

        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Author Image:
            </p>
            <Image
              src={contentDetail!.authorImage}
              w={80}
              h={80}
              className="ml-3"
              fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            />
          </div>
        </div>

        <InformationField
          label="Author Name:"
          value={contentDetail.authorName}
        />
        <InformationField
          label="Author Title:"
          value={contentDetail.authorTitle || ''}
        />
        <InformationField
          label="Author Bio:"
          value={contentDetail.authorBio || ''}
        />

        <InformationField
          label="Source URL:"
          value={contentDetail.imageSourceCitation || ''}
        />
        <InformationField
          label="End Date:"
          value={contentDetail.endDate || ''}
        />
        <InformationField
          label="Category:"
          value={contentDetail.category || ''}
        />
        <InformationField
          label="Status:"
          value={contentDetail.mediaStatus || ''}
        />
        <InformationField
          label="Publish Date:"
          value={contentDetail.publishDate || ''}
        />
        <InformationField label="Visibility Status:" value="Active/InActive" />
        <InformationField
          label="Created Date:"
          value={contentDetail.createdAt || ''}
        />
      </div>
    </div>
  )
}

export default ContentDetailPage
