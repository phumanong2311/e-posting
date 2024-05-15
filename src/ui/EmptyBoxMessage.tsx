import { IconBox } from "@tabler/icons-react";
import clsx from "clsx";

interface EmptyBoxMessageProps {
  className?: string;
  message?: string;
}

export const EmptyBoxMessage = ({
  className,
  message,
}: EmptyBoxMessageProps) => {
  return (
    <div
      className={clsx(
        [className],
        `w-full flex items-center justify-center flex-col`
      )}
    >
      <IconBox size={48} strokeWidth={2} style={{ marginBottom: "10px" }} />
      <p>{message ? message : "No data available"}</p>
    </div>
  );
};
