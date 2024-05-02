import { IconChevronLeft } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "../../lib/toast";
import { requestService } from "../../services";
import { Request } from "../../types";
import { LabelInput, RichEditor } from "../../ui";

const EditJobRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestDetail, setRequestDetail] = useState<Request>();

  useQuery({
    queryKey: [id],
    queryFn: () =>
      requestService.getRequestDetail(id!).then((res) => {
        if (res.result) {
          setRequestDetail(res.result)
          reset(res.result);
        }
        return null
      }),
  })
  const methods = useForm({
    defaultValues: requestDetail,
  });
  const { register, handleSubmit, reset, formState, control } = methods;

  const { isDirty } = formState;

  const onBack = () => {
    navigate(-1);
  };

  const onSubmit = async (value: any) => {
    if (isDirty) {
      await requestService
        .editRequest(id!, value)
        .then((result) => {
          result && toast.success("Job request updated successfully");
          onBack();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const deletePost = async () => {
    await requestService
      .deleteRequest(id!)
      .then((res) => {
        if (res) {
          toast.success("Job request deleted successfully");
          onBack();
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (!requestDetail) return <></>;
  return (
    <div className="w-full flex justify-center items-center mt-10 pb-[100px]">
      <div className="w-full px-16">
        <p
          className="flex text-lg items-center w-full justify-end text-purple-500 cursor-pointer "
          onClick={() => onBack()}
        >
          <IconChevronLeft /> back to list
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full p-6 max-w-screen-lg space-y-4">
            <LabelInput label="Request Title:" name="requestTitle" register={register} />
            <LabelInput label="Request Owner:" name="requestOwner" register={register} />
            <LabelInput label="Company:" name="company" register={register} />
            <LabelInput label="City:" name="city" register={register} />
            <LabelInput label="Division:" name="division" register={register} />
            <LabelInput
              label="Workplace type: "
              name="workLocationType"
              register={register}
            />
            <LabelInput
              label="Employment type: "
              name="employmentType"
              register={register}
            />
            <LabelInput label="Minimum Salary:" name="minimumSalary" register={register} />
            <LabelInput
              label="Total Compensation: "
              name="totalCompensation"
              register={register}
            />
            <div className="flex w-full my-6">
              <Controller
                name="coverLetter"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RichEditor
                    name="coverLetter"
                    label="Cover Letter: "
                    labelClass="font-bold text-lg text-right max-w-[300px]"
                    className="w-full rounded-md"
                    wrapperClass="w-full"
                    value={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <LabelInput
              label="Required Skills: "
              name="skills"
              register={register}
            />
          </div>

          <div className="flex justify-center gap-5 items-center">
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
            <Button
              className="rounded-lg border-1"
              title="Remove"
              variant="outline"
              size="sm"
              onClick={deletePost}
            >
              Remove
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobRequest;
