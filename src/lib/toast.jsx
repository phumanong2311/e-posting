import { showNotification } from "@mantine/notifications"

export const toast = {
  success: (message) => {
    showNotification({
      message,
      color: "green",
    })
  },
  error: (message) => {
    showNotification({
      message,
      color: "red",
    });
  },
}