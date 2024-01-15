import { IconChevronLeft } from "@tabler/icons-react";
import { FormProvider, useForm } from "react-hook-form";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomInput from "../InputField/CustomInput";
import CustomDateTimePicker from "../InputField/CustomDateTimePicker";
import RichEditor from "../InputField/RichEditor";
import { Button } from "@mantine/core";
import { jobService } from "../../services";
import { toast } from "../../lib/toast";

const EditJobPosting = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const { job: jobDetail, ...locationState } = state || {};
  const methods = useForm({
    defaultValues: {
      ...jobDetail,
    },
  });

  const { isFromSearchPage } = locationState || {};

  const onSubmit =  async (value: any) => {
    await jobService.editJob(id!, value).then((result) => {
      result && toast.success("Job posting updated successfully");
      navigate(isFromSearchPage ? "/search" : "/dashboard/job-postings")
    }).catch((error) => {
      toast.error(error.message)
    })
  };

  if (!jobDetail) return <></>;
  return (
    <div className="w-full flex justify-center items-center mt-10 pb-[100px]">
      <div className="w-full px-16">
        <p
          className="flex text-lg items-center w-full justify-end text-purple-500 cursor-pointer "
          onClick={() =>
            navigate(isFromSearchPage ? "/search" : "/dashboard/job-postings")
          }
        >
          <IconChevronLeft /> back to list
        </p>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
            <div className="flex w-full my-6">
              <CustomInput
                name="jobTitle"
                label="Role: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
              />
            </div>
            <div className="flex w-full my-6">
              <CustomInput
                name="company"
                label="Company: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
              />
            </div>
            <div className="flex w-full my-6">
              <CustomInput
                name="city"
                label="City: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
              />
            </div>
            <div className="flex w-full my-6">
              <CustomInput
                name="state"
                label="State: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
              />
            </div>

            <div className="flex w-full my-6">
              <CustomInput
                name="workLocationType"
                label="Workplace type: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
              />
            </div>

            <div className="flex w-full my-6">
              <CustomInput
                name="employmentType"
                label="Employment type: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
              />
            </div>

            <div className="flex w-full my-6">
              <CustomInput
                name="yearsOfExperience"
                label="Required year of experience: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
              />
            </div>

            <div className="flex w-full my-6">
              <CustomInput
                name="baseSalary"
                label="Salary: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
                isNumber
              />
            </div>

            <div className="flex w-full my-6">
              <CustomInput
                name="totalCompensation"
                label="Total Compensation: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
                isNumber
              />
            </div>

            <div className="flex w-full my-6">
              <CustomDateTimePicker
                name="closingDate"
                label="Closing Date: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
              />
            </div>

            <div className="flex w-full my-6">
              <RichEditor
                name="description"
                label="Job Description: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
              />
            </div>

            <div className="flex w-full my-6">
              <CustomInput
                name="skills"
                label="Required Skills: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
              />
            </div>

            <div className="flex justify-center gap-5 items-center">
              <Button
                type="submit"
                className="rounded-lg border-1"
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
              >
                Remove
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditJobPosting;
