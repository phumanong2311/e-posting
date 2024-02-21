import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import jobService from "../services/job.service";
import { Job, paths } from "../types";
import { toast } from "../lib/toast";
import { useAppProviderCtx } from "../app-provider";

const MyJobPostingsDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: { user },
  } = useAppProviderCtx();
  const [jobDetail, setJobDetail] = useState<Job>();

  const isMyJobPosting = useMemo(
    () => user?.id === jobDetail?.jobOwnerId,
    [user, jobDetail?.jobOwnerId]
  );

  useQuery({
    queryKey: [id],
    queryFn: () =>
      jobService.getJobDetail({ jobId: id }).then((res) => {
        if (res.result) {
          setJobDetail(res.result);
          return res.result;
        }
        return null;
      }),
  });

  const onBack = () => {
    navigate(-1);
  };

  const onEdit = () => {
    navigate(
      `/${paths.ROOT}/${paths.DASHBOARD}/${paths.EDIT_JOB_POSTING}/${
        jobDetail!._id
      }`
    );
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

        {!isMyJobPosting && (
          <div className="flex w-full justify-between items-center my-6">
            <div className="flex items-center">
              <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
                Owner:
              </p>
              <p className="text-lg ml-3 font-bold">{jobDetail!.jobOwner}</p>
            </div>
            <div className="flex gap-3">
              <IconPencil className="cursor-pointer" onClick={() => onEdit()} />
              <IconTrash className="cursor-pointer" onClick={deletePost} />
            </div>
          </div>
        )}
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Job Title:
            </p>
            <p className="text-lg ml-3 font-bold">{jobDetail!.jobTitle}</p>
          </div>
          <div className="flex gap-3">
            {isMyJobPosting && (
              <>
                <IconPencil
                  className="cursor-pointer"
                  onClick={() => onEdit()}
                />
                <IconTrash className="cursor-pointer" onClick={deletePost} />
              </>
            )}
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Company:
            </p>
            <p className="text-lg ml-3">{jobDetail!.company}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              City:{" "}
            </p>
            <p className="text-lg ml-3">{jobDetail!.city}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              State:{" "}
            </p>
            <p className="text-lg ml-3">{jobDetail!.state}</p>
          </div>
          <div>
            {/* <p className="text-lg ml-3 text-gray-400">
              (Job Title from profile)
            </p> */}
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Workplace Type:
            </p>
            <p className="text-lg ml-3">{jobDetail!.workLocationType}</p>
          </div>
          <div>
            {/* <p className="text-lg ml-3 text-gray-400">
              (local, google, linkedin)
            </p> */}
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Employment Type:
            </p>
            <p className="text-lg ml-3">{jobDetail!.employmentType}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Required years of experience:
            </p>
            <p className="text-lg ml-3">{jobDetail!.yearsOfExperience}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Salary:
            </p>
            <p className="text-lg ml-3">{jobDetail!.baseSalary}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Salary:
            </p>
            <p className="text-lg ml-3">{jobDetail!.baseSalary}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Total Comp:
            </p>
            <p className="text-lg ml-3">{jobDetail!.totalCompensation}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Closing Date:
            </p>
            <p className="text-lg ml-3">{jobDetail!.closingDate}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex ">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Job Description:
            </p>
            <p className="text-lg ml-3">{jobDetail!.description}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Required Skills
            </p>
            <p className="text-lg ml-3">{jobDetail!.skills}</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MyJobPostingsDetailPage;
