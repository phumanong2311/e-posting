import { IconChevronLeft, IconPencil } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { requestService } from "../../services";
import { Request, paths } from "../../types";

const RequestDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [requestDetail, setRequestDetail] = useState<Request>();

  useQuery({
    queryKey: [id],
    queryFn: () =>
      requestService.getRequestDetail(id!).then((res) => {
        if (res.result) {
          setRequestDetail(res.result);
          return res.result;
        }
        return null;
      }),
  });

  const onBack = () => {
    navigate(-1);
  };

  const onEdit = () => {
    navigate(`/${paths.ROOT}/${paths.EDIT_COMPANY}/${requestDetail!._id}`);
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
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center" />
          <div className="flex gap-3">
            <>
              <IconPencil className="cursor-pointer" onClick={() => onEdit()} />
            </>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Owner:
            </p>
            <p className="text-lg ml-3">{requestDetail!.requestOwner}</p>
          </div>
        </div>
        <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Title:
            </p>
            <p className="text-lg ml-3">{requestDetail!.requestTitle}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Company:
            </p>
            <p className="text-lg ml-3">{requestDetail!.company}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Country:
            </p>
            <p className="text-lg ml-3">{requestDetail!.country}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              state(division):
            </p>
            <p className="text-lg ml-3">{requestDetail!.division}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              city:
            </p>
            <p className="text-lg ml-3">{requestDetail!.city}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              workplace type(worklocationType):
            </p>
            <p className="text-lg ml-3">{requestDetail!.workLocationType}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              employment type:
            </p>
            <p className="text-lg ml-3">{requestDetail!.employmentType}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              minimum salary:
            </p>
            <p className="text-lg ml-3">{requestDetail!.minimumSalary}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              total comp:
            </p>
            <p className="text-lg ml-3">{requestDetail!.totalCompensation}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              cover letter:
            </p>
            <p className="text-lg ml-3">{requestDetail!.coverLetter}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              closing date:
            </p>
            <p className="text-lg ml-3">{requestDetail!.closingDate}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              user summary:
            </p>
            <p className="text-lg ml-3">{requestDetail!.userSummary}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              skills:
            </p>
            <p className="text-lg ml-3">{requestDetail!.skills}</p>
          </div>
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              visible to:
            </p>
            <p className="text-lg ml-3">{requestDetail!.visibleTo}</p>
          </div>
      </div>
    </div>
  );
};

export default RequestDetailPage;
