import { Button, Input, Select } from "@mantine/core";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { DateInput } from "@mantine/dates";
import { ContentPayload } from "../../types";
import { ImageInput, LabelInput, RichEditor } from "../../ui";

type ContentFormProps = {
  onSubmit: (value: any) => void;
  content?: ContentPayload;
};

const ContentForm = ({ onSubmit, content }: ContentFormProps) => {
  const methods = useForm({});
  const { register, handleSubmit, reset, formState, control } = methods;

  const { isDirty } = formState;

  useEffect(() => {
    if (content) {
      reset({
        ...content,
        displayImage: content.displayImage,
      });
    }
  }, [content]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="w-full p-6 max-w-screen-lg space-y-4">
        <Input.Wrapper className="flex items-center">
          <span className="mr-2 w-1/3 text-right font-semibold">
            Content Type:
          </span>
          <Controller
            name="contentType"
            control={control}
            defaultValue={content?.contentType || "media"}
            render={({ field: { onChange, value } }) => (
              <Select
                data={[
                  { value: "media", label: "Media" },
                  { value: "news", label: "News" },
                  { value: "other", label: "Other" },
                ]}
                defaultValue={value ? value : "media"}
                onChange={onChange}
              />
            )}
          />
        </Input.Wrapper>

        <LabelInput label="Title:" name="title" register={register} />
        <LabelInput
          label="Tagline Display:"
          name="tagline"
          register={register}
        />
        <Controller
          name="displayImage"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ImageInput
              label="Display Image:"
              name="displayImage"
              register={register}
              onChange={onChange}
              value={value}
            />
          )}
        />
        <LabelInput
          label="Cite image source:"
          name="imageSourceCitation"
          register={register}
        />
        <Controller
          name="description"
          control={control}
          render={({ field: { onChange, value } }) => (
            <RichEditor
              name="description"
              label="Description: "
              labelClass="text-right w-1/3"
              className="w-2/3 rounded-md"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <LabelInput
          label="Publication Name:"
          name="publicationName"
          register={register}
        />
        <LabelInput label="Source URL:" name="sourceUrl" register={register} />
        <Input.Wrapper className="flex items-center">
          <span className="mr-2 w-1/3 text-right font-semibold">End Date:</span>
          <Controller
            name="endDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateInput
                value={value ? new Date(value) : undefined}
                onChange={onChange}
              />
            )}
          />
        </Input.Wrapper>
        <Input.Wrapper className="flex items-center">
          <span className="mr-2 w-1/3 text-right font-semibold">Category:</span>
          <Controller
            name="category"
            control={control}
            defaultValue={content?.category || "general"}
            render={({ field: { onChange, value } }) => (
              <Select
                data={[
                  { value: "general", label: "General" },
                  { value: "other", label: "Other" },
                ]}
                defaultValue={value ? value : "general"}
                onChange={onChange}
              />
            )}
          />
        </Input.Wrapper>
        <Input.Wrapper className="flex items-center">
          <span className="mr-2 w-1/3 text-right font-semibold">Status:</span>
          <Controller
            name="mediaStatus"
            control={control}
            defaultValue={content?.mediaStatus || "draft"}
            render={({ field: { onChange, value } }) => (
              <Select
                data={[
                  { value: "draft", label: "Draft" },
                  { value: "reviewed", label: "Reviewed" },
                  { value: "approved", label: "Approved" },
                  { value: "published", label: "Published" },
                ]}
                defaultValue={value ? value : "draft"}
                onChange={onChange}
              />
            )}
          />
        </Input.Wrapper>
        <Input.Wrapper className="flex items-center">
          <span className="mr-2 w-1/3 text-right font-semibold">
            Publish Date:
          </span>
          <Controller
            name="publishDate"
            control={control}
            render={({ field: { onChange, value } }) => (
              <DateInput
                value={value ? new Date(value) : undefined}
                onChange={onChange}
              />
            )}
          />
        </Input.Wrapper>
      </div>

      <div className="flex justify-end gap-5 items-center">
        <Button
          type="submit"
          className={`rounded-lg border-1 cursor-pointer ${
            !isDirty ? "border-red-200 text-gray-300" : ""
          }`}
          title="Save"
          variant="outline"
          size="sm"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ContentForm;
