import { useState } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { contentManagementService } from "../../services";
import { toast } from "../../lib/toast";
import { ContentPayload, ContentType } from "../../types";
import ContentForm from "./ContentForm";

const EditContentPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const onBack = () => {
    navigate(-1);
  };

  const [contentDetail, setContentDetail] = useState<ContentType>();

  useQuery({
    queryKey: [id],
    queryFn: () =>
      contentManagementService.getDetail(id!).then((res) => {
        if (res.result) {
          setContentDetail(res.result);
          return res.result;
        }
        return null;
      }),
  });

  const onSubmit = async (value: ContentPayload) => {
    const content: ContentPayload = {
      title: value.title,
      contentType: value.contentType,
      tagline: value.tagline,
      description: value.description,
      publicationName: value.publicationName,
      sourceUrl: value.sourceUrl,
      imageSourceCitation: value.imageSourceCitation,
      category: value.category,
      endDate: value.endDate,
      publishDate: value.publishDate,
      mediaStatus: value.mediaStatus,
    };

    if (typeof value.displayImage !== "string" && value.displayImage) {
      const file = value.displayImage;
      const imageLogoUrl = await contentManagementService.getImageLogoUrl(file);
      if (imageLogoUrl) {
        content.displayImage = imageLogoUrl.url ? imageLogoUrl.url : "";
      }
    }

    await contentManagementService
      .edit(id!, value)
      .then((result) => {
        result && toast.success("Content is edited successfully");
        onBack();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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
  );
};

export default EditContentPage;
