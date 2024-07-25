import { Button, Input, Select } from "@mantine/core";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Assignee, AsssigneeArr, SupportTicket } from "../../../types";
import { InformationField, RichEditor } from "../../../ui";

type SupportTiketFormProps = {
  onSubmit: (value: any) => void;
  supportTicket?: SupportTicket;
  assignee?: Assignee[];
};

const SupportTiketForm = ({
  onSubmit,
  supportTicket,
  assignee,
}: SupportTiketFormProps) => {
  const methods = useForm({});
  const { handleSubmit, reset, formState, control } = methods;

  const { isDirty } = formState;

  const [assigneeData, setAssigneeData] = useState<AsssigneeArr[]>();

  useEffect(() => {
    const data =
      assignee && assignee.length > 0
        ? assignee.map((item) => {
            return {
              value: item.id,
              label: item.profile.firstName + " " + item.profile.lastName,
            };
          })
        : [];
    setAssigneeData(data);
  }, [supportTicket, assignee]);

  useEffect(() => {
    if (assigneeData && supportTicket) {
      reset({
        assignedMemberId: supportTicket?.assignedMemberId,
        priorityLevel: supportTicket?.priorityLevel,
      });
    }
  }, [supportTicket && assigneeData]);

  if (!supportTicket) return <></>;
  return (
    <>
      <div className="w-3/4 mx-auto p-6 max-w-screen-lg space-y-4">
        <InformationField
          className=""
          label="Sub-Topic:"
          value={supportTicket.subTopic!}
        />
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
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="w-full px-6 max-w-screen-lg space-y-4">
          <Input.Wrapper className="flex items-center">
            <span className="mr-2 w-1/3 text-right font-bold">
              Assignee (Handling Ticket):
            </span>
            <Controller
              name="assignedMemberId"
              control={control}
              defaultValue={
                assigneeData?.find(
                  (data) =>
                    data.value === supportTicket?.assignedMemberId?.toString()
                )?.value || ""
              }
              render={({ field: { onChange, value } }) => {
                return (
                  <Select
                    data={assigneeData}
                    onChange={onChange}
                    value={value}
                  />
                );
              }}
            />
          </Input.Wrapper>

          <Input.Wrapper className="flex items-center">
            <span className="mr-2 w-1/3 text-right font-bold">Priority :</span>
            <Controller
              name="priorityLevel"
              control={control}
              defaultValue={supportTicket?.priorityLevel?.toString() || "1"}
              render={({ field: { onChange, value } }) => {
                const data = [
                  {
                    value: "1",
                    label: "Low",
                  },
                  {
                    value: "2",
                    label: "Medium",
                  },
                  {
                    value: "3",
                    label: "High",
                  },
                  {
                    value: "4",
                    label: "Critical",
                  },
                ];
                return <Select data={data} value={value} onChange={onChange} />;
              }}
            />
          </Input.Wrapper>
          <Controller
            name="resolutionNotes"
            control={control}
            render={({ field: { onChange, value } }) => (
              <RichEditor
                name="resolutionNotes"
                label="Resolution Notes: "
                labelClass="text-right w-1/3"
                className="w-2/3 rounded-md"
                value={value}
                onChange={onChange}
              />
            )}
          />

          <Input.Wrapper className="flex items-center">
            <span className="mr-2 w-1/3 text-right font-bold">Status :</span>
            <Controller
              name="status"
              control={control}
              defaultValue={
                supportTicket?.supportTicketStatus?.toString() || "1"
              }
              render={({ field: { onChange, value } }) => {
                const data = [
                  {
                    value: "1",
                    label: "Open",
                  },
                  {
                    value: "2",
                    label: "Closed",
                  },
                ];
                return <Select data={data} value={value} onChange={onChange} />;
              }}
            />
          </Input.Wrapper>
        </div>

        <div className="flex justify-end gap-5 items-center">
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
        </div>
      </form>
    </>
  );
};

export default SupportTiketForm;
