import { Divider } from "@mantine/core";
import { useAppProviderCtx } from "../../app-provider";
import { getRoleName, getUserCountry } from "../../utils";
import moment from "moment";

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
        <p className="text-md text-gray-400 ml-3">{getUserCountry()}</p>
      </div>
      <Divider orientation="vertical" />
      <div className="flex ml-4">
        <p className="text-md text-gray-400">Page last updated on: </p>
        <p className="text-md text-gray-400 ml-3">
          {moment(new Date()).format("MM/DD/YYYY")}
        </p>
      </div>
    </footer>
  );
};
