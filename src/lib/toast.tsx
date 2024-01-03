import { showNotification } from "@mantine/notifications";

export interface ToastI {
  success: (message: string) => void;
  error: (message: string) => void;
}

export const toast: ToastI = {
  success: (message) => {
    showNotification({
      message,
      color: "green",
    });
  },
  error: (message) => {
    showNotification({
      message,
      color: "red",
    });
  },
};
