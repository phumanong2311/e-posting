import { IconChevronLeft, IconPencil, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import { toast } from "../../lib/toast";
import { requestServices } from "../../services";
import { paths, Request } from "../../types";
import { InformationField } from "../../ui";

interface IMyJobRequestDetail {
  requestDetail: Request;
}

const MyJobRequestDetail = ({
  requestDetail
}: IMyJobRequestDetail) => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate(-1);
  };

  const onEdit = () => {
    navigate(
      `/${paths.ROOT}/${paths.DASHBOARD}/${paths.EDIT_JOB_REQUEST}/${
        requestDetail!._id
      }`
    );
  };

  const deletePost = async () => {
    await requestServices
      .deleteRequest(requestDetail!._id)
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

  if (!requestDetail) return <></>;
  return (
    <div className="w-full flex justify-center items-center mt-10 pb-[100px]">
      <div className="w-full px-16">
        <p
          className="flex text-lg items-center w-full justify-end text-purple-500 cursor-pointer "
          onClick={() => onBack()}
        >
          <IconChevronLeft /> Back to list
        </p>

        <InformationField
          label="Request Title:"
          value={requestDetail.requestTitle ? requestDetail.requestTitle : ""}
          className="font-bold"
          actionComponent={
            <>
              <IconPencil className="cursor-pointer" onClick={() => onEdit()} />
              <IconTrash className="cursor-pointer" onClick={deletePost} />
            </>
          }
        />

        <InformationField
          label="Request Owner: "
          value={requestDetail.requestOwner ? requestDetail!.requestOwner : ""}
        />

        <InformationField
          label="Company: "
          value={requestDetail.company ? requestDetail!.company : ""}
        />

        <InformationField
          label="City:"
          value={requestDetail.city ? requestDetail.city : ""}
        />

        <InformationField
          label="Division:"
          value={requestDetail.division ? requestDetail.division : ""}
        />

        <InformationField
          label="Workplace Type: "
          value={
            requestDetail.workLocationType ? requestDetail.workLocationType : ""
          }
        />

        <InformationField
          label="Employment Type: "
          value={
            requestDetail.employmentType ? requestDetail.employmentType : ""
          }
        />

        <InformationField
          label="Minimum Salary: "
          value={requestDetail.minimumSalary ? requestDetail.minimumSalary : ""}
        />

        <InformationField
          label="Total Comp: "
          value={
            requestDetail.totalCompensation
              ? requestDetail!.totalCompensation
              : ""
          }
        />

        <InformationField
          label="Closing Date: "
          value={requestDetail.closingDate ? requestDetail.closingDate : ""}
        />

        <InformationField
          label="Required Skills: "
          value={requestDetail.skills ? requestDetail.skills.toString() : ""}
        />
        <InformationField
          label="Cover Letter: "
          value={requestDetail.coverLetter ? requestDetail.coverLetter : ""}
        />
      </div>
    </div>
  );
};

export default MyJobRequestDetail;
