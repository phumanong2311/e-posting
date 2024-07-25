import { IconChevronLeft, IconPencil } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { supportManagementServices } from "../../../services";
import { paths, SupportTicket } from "../../../types";
import { InformationField } from "../../../ui";

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

  const onEdit = () => {
    return navigate(
      `/${paths.ROOT}/${paths.SUPPORT_MANAGEMENT}/${paths.EDIT_SUPPORT_TICKET}/${id}`
    );
  };

  if (!supportTicket) return <></>;
  return (
    <div className="w-full flex justify-center items-center mt-10 pb-[100px]">
      <div className="w-full px-16 items-center justify-end">
        <p
          className="flex text-lg  text-purple-500 cursor-pointer "
          onClick={() => onBack()}
        >
          <IconChevronLeft /> back to list
        </p>
        <div className="flex w-full justify-between items-center my-6">
          <InformationField
            label="Contact Reason:"
            value={supportTicket.mainTopic!}
          />
          <div className="flex gap-3">
            <>
              <IconPencil className="cursor-pointer" onClick={() => onEdit()} />
            </>
          </div>
        </div>
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
