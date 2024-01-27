import { IconChevronLeft } from "@tabler/icons-react";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "../../lib/toast";
import { jobService } from "../../services";
import { DatePickerUI, LabelInput, RichEditor } from "../../ui";

const EditJobPosting = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobDetail, setJobDetail] = useState();

  const { ...locationState } = state || {};

  useQuery({
    queryKey: [id],
    queryFn: () =>
      jobService.getJobDetail({ jobId: id }).then((res) => {
        if (res.result) {
          setJobDetail(res.result);
          reset(res.result);
        }
        return null;
      }),
  });
  const methods = useForm({
    defaultValues: jobDetail,
  });
  const { register, handleSubmit, reset, formState, control } = methods;

  const { isDirty } = formState;

  const { isFromSearchPage } = locationState || {};

  const onBack = () => {
    navigate(
      isFromSearchPage ? "/admin/search" : "/admin/dashboard/job-postings"
    );
  };

  const onSubmit = async (value: any) => {
    if (isDirty) {
      await jobService
        .editJob(id!, value)
        .then((result) => {
          result && toast.success("Job posting updated successfully");
          onBack();
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  const deletePost = async () => {
    await jobService
      .deleteJob(id!)
      .then((res) => {
        if (res) {
          toast.success("Job posting deleted successfully");
          onBack();
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (!jobDetail) return <></>;
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
            <LabelInput label="Role:" name="jobTitle" register={register} />
            <LabelInput label="Company:" name="company" register={register} />
            <LabelInput label="City:" name="city" register={register} />
            <LabelInput label="State:" name="state" register={register} />
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
            <LabelInput
              label="Required year of experience: "
              name="yearsOfExperience"
              register={register}
            />
            <LabelInput label="Salary:" name="baseSalary" register={register} />
            <LabelInput
              label="Total Compensation: "
              name="totalCompensation"
              register={register}
            />
            <Controller
              name="closingDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <DatePickerUI
                  value={value}
                  onChange={onChange}
                  name="closingDate"
                  label="Closing Date: "
                  register={register}
                />
              )}
            />
            <div className="flex w-full my-6">
              <Controller
                name="description"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RichEditor
                    name="description"
                    label="Job Description: "
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

export default EditJobPosting;
