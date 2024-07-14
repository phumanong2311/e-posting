import { IconPencil } from "@tabler/icons-react";
import ConfirmModal from "../../../ui/ConfirmModal";
import { Button, TextInput } from "@mantine/core";
import { useState } from "react";

const UpdateUserMisconductModal = ({
  misconductId,
  currentUserName,
  currentNumberOfReports,
  handleUpdate,
}: {
  misconductId: string;
  currentUserName: string;
  currentNumberOfReports: number;
  handleUpdate: Function;
}) => {
  const [userName, setUserName] = useState(currentUserName);
  const [numberOfReports, setNumberOfReports] = useState(
    currentNumberOfReports
  );

  const renderChildren = () => {
    return (
      <>
        <TextInput
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className={`w-2/3 rounded-md`}
        />
        <TextInput
          value={numberOfReports}
          type="number"
          onChange={(e) => setNumberOfReports(+e.target.value)}
          className={`w-2/3 rounded-md`}
        />
      </>
    );
  };

  return (
    <ConfirmModal
      trigger={
        <Button
          variant="outline"
          leftSection={<IconPencil className="cursor-pointer" />}
          children="Edit"
          className="h-full"
        />
      }
      title="Update ticket's status"
      children={renderChildren()}
      onConfirm={() => handleUpdate(misconductId, userName, numberOfReports)}
    />
  );
};

export default UpdateUserMisconductModal;
