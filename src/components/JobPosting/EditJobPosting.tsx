import { IconChevronLeft } from "@tabler/icons-react";
import { useForm } from "react-hook-form";

import { Button } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { jobService } from "../../services";
import { LabelInput } from "../../ui";
import CustomDateTimePicker from "../InputField/CustomDateTimePicker";

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
        }
        return null;
      }),
  });
  const methods = useForm({
    defaultValues: jobDetail,
  });
  const { register, handleSubmit } = methods;
  console.log("jobDetail", jobDetail);

  const { isFromSearchPage } = locationState || {};

  const onSubmit = async (value: any) => {
    console.log(value);
    // await jobService
    //   .editJob(id!, value)
    //   .then((result) => {
    //     result && toast.success("Job posting updated successfully");
    //     navigate(isFromSearchPage ? "/search" : "/dashboard/job-postings");
    //   })
    //   .catch((error) => {
    //     toast.error(error.message);
    //   });
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
        {/* <FormProvider {...methods}> */}
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="w-full p-6 max-w-screen-lg space-y-4">
            <LabelInput label="Role" name="jobTitle" register={register} />
            <LabelInput label="Company" name="company" register={register} />
            <LabelInput label="City" name="city" register={register} />
            <LabelInput label="State" name="state" register={register} />
            <LabelInput label="Workplace type" name="workLocationType" register={register} />
            <LabelInput label="Employment type" name="employmentType" register={register} />
            <LabelInput label="Required year of experience" name="yearsOfExperience" register={register} />
            <LabelInput label="Salary" name="baseSalary" register={register} />
            <LabelInput label="Total Compensation" name="totalCompensation" register={register} />
            <CustomDateTimePicker
                name="closingDate"
                label="Closing Date: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
              />
          </div>

          {/* <div className="flex w-full my-6">
              <CustomDateTimePicker
                name="closingDate"
                label="Closing Date: "
                labelClass="font-bold text-lg text-right min-w-[300px] max-w-[300px]"
                containerClass="max-w-[1000px]"
              />
            </div> */}

          {/* <div className="flex w-full my-6">
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
          </div> */}

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
        {/* </FormProvider> */}
      </div>
    </div>
  );
};

export default EditJobPosting;
