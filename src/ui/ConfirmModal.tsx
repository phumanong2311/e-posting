import React, { useState } from "react";
import { Modal, Button, Title, Text, Group } from "@mantine/core";

interface ModalProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const ConfirmModal: React.FC<ModalProps> = ({
  trigger,
  children,
  title,
  onCancel,
  onConfirm,
}) => {
  const [opened, setOpened] = useState(false);

  const handleOpen = () => setOpened(true);
  const handleClose = () => {
    setOpened(false);
    onCancel?.(); // Call the optional onCancel callback
  };
  const handleConfirm = () => {
    setOpened(false);
    onConfirm?.(); // Call the optional onConfirm callback
  };

  return (
    <>
      <Button onClick={handleOpen}>{trigger}</Button>
      <Modal opened={opened} onClose={handleClose}>
        <Title>{title}</Title>
        <Text>{children}</Text>
        <Group
          mt="md"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleConfirm}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default ConfirmModal;
