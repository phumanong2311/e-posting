import { IconChevronLeft } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { supportManagementServices } from "../../../services";
import { SupportTicket } from "../../../types";
import { InformationField } from "../../../ui";
import UpdateTicketModal from "./UpdateTicketModal";
import { toast } from "../../../lib/toast";

const ContentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [supportTicket, setSupportTicket] = useState<SupportTicket>();

  useQuery({
    queryKey: [id],
    queryFn: () =>
      supportManagementServices.getSupportTicketDetail(id!).then((res) => {
        if (res.result) {
          setSupportTicket(res.result);
          return res.result;
        }
        return null;
      }),
  });

  const onBack = () => {
    navigate(-1);
  };

  const handleUpdateStatus = (
    supportTicketId: string,
    status: number,
    priorityLevel: number
  ) => {
    supportManagementServices
      .updateSupportTicketStatus({
        supportTicketId,
        supportTicketStatus: status,
        priorityLevel,
      })
      .then((result) => {
        result && toast.success("Update status successfully");
      })
      .catch(() => {
        toast.error("Update support ticket failed");
      });
  };

  if (!supportTicket) return <></>;
  return (
    <div className="w-full flex justify-center items-center mt-10 pb-[100px]">
      <div className="w-full px-16 items-center w-full justify-end">
        <p
          className="flex text-lg  text-purple-500 cursor-pointer "
          onClick={() => onBack()}
        >
          <IconChevronLeft /> back to list
        </p>
        <div className="flex gap-3 justify-end">
          <>
            <UpdateTicketModal
              supportTicketId={id!}
              currentStatus={supportTicket.supportTicketStatus!}
              currentPriorityLevel={supportTicket.priorityLevel!}
              handleUpdateStatus={handleUpdateStatus}
            />
          </>
        </div>

        <InformationField
          label="Contact Reason:"
          value={supportTicket.mainTopic!}
        />
        <InformationField label="Sub topic:" value={supportTicket.subTopic!} />
        <InformationField
          label="First Name:"
          value={supportTicket.firstName!}
        />
        <InformationField label="Last Name:" value={supportTicket.lastName!} />
        <InformationField label="Company:" value={supportTicket.company!} />
        <InformationField label="Email:" value={supportTicket.email!} />
        <InformationField
          label="How can we help:"
          value={supportTicket.issueDetails!}
        />
        <InformationField
          label="How you hear about us?:"
          value={supportTicket.systemGeneratedTicket ? "Referral" : "Website"}
        />

        <InformationField
          label="Assignee (Handling Ticket):"
          value={supportTicket.assignedMemberName!}
        />

        <InformationField
          label="Resolution Notes:"
          value={supportTicket.resolutionNotes!}
        />

        <InformationField
          label="Created Date:"
          value={supportTicket.createdAt!}
        />
      </div>
    </div>
  );
};

export default ContentDetailPage;
