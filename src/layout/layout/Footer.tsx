import { Divider } from "@mantine/core";
import { useAppProviderCtx } from "../../app-provider";
import { getRoleName } from "../../utils";

export const Footer = () => {
  const {
    data: { user },
  } = useAppProviderCtx();

  return (
    <footer className="w-full flex items-center px-16 py-5">
      <div className="flex mr-4">
        <p className="text-md text-gray-400">Access Level: </p>
        <p className="text-md text-gray-400 ml-3">{getRoleName(user?.role!)}</p>
      </div>
      <Divider orientation="vertical" />
      <div className="flex mx-4">
        <p className="text-md text-gray-400">Country of access: </p>
        <p className="text-md text-gray-400 ml-3">United States</p>
      </div>
      <Divider orientation="vertical" />
      <div className="flex ml-4">
        <p className="text-md text-gray-400">Page last updated on: </p>
        <p className="text-md text-gray-400 ml-3">02/22/2025</p>
      </div>
    </footer>
  );
};
