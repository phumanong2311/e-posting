import { IconChevronLeft } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import supportManagementService from "../../../services/supportManagementServices";
import { Assignee, SupportTicket, SupportTicketPayload } from "../../../types";
import SupportTiketForm from "./SupportTiketForm";
import { toast } from "../../../lib/toast";

const EditSupportTicketPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supportTicket, setSupportTicket] = useState<SupportTicket>();
  const [assignee, setAssignee] = useState<Assignee[]>();

  const onBack = () => {
    navigate(-1);
  };

  useQuery({
    queryKey: [id],
    queryFn: () => {
      supportManagementService.getSupportTicketDetail(id!).then((res) => {
        if (res.result) {
          setSupportTicket(res.result);
          return res.result;
        }
        return null;
      });
    },
  });

  useQuery({
    queryKey: ["assignee"],
    queryFn: () => {
      supportManagementService.getAssignee().then((res) => {
        if (res.result) {
          setAssignee(res.result.users);
          return res.result.users;
        }
        return null;
      });
    },
  });

  const onSubmit = async (data: any) => {
    const payload: SupportTicketPayload = {
      assignedMemberId: data.assignedMemberId,
      priorityLevel: Number(data.priorityLevel),
      status: Number(data.status),
      resolutionNotes: data.resolutionNotes,
    };
    await supportManagementService.updateSupportTicketStatus({
      supportTicketId: id!,
      payload: payload,
    }).then((result) => {
      result && toast.success('Ticket is edited successfully')
      onBack()
    })
    .catch((error) => {
      toast.error(error.message)
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
        <SupportTiketForm
          onSubmit={onSubmit}
          supportTicket={supportTicket}
          assignee={assignee}
        />
      </div>
    </div>
  );
};

export default EditSupportTicketPage;
