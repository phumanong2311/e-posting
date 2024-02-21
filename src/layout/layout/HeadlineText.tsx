import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { paths } from "../../types";

export const HeadlineText = () => {
  const location = useLocation();
  const headlineText = useMemo(() => {
    switch (location.pathname) {
      case `/${paths.ROOT}/${paths.SEARCH}`:
        return "Display your list of Job Request Results by creation date";
      case `/${paths.ROOT}/${paths.DASHBOARD}/${paths.PROFILE}`:
        return "Display your User information form user account and profile from account used to login to admin portal (whoami page)";
      case `/${paths.ROOT}/${paths.DASHBOARD}/${paths.JOB_POSTING}`:
        return "Displays your list of Job Posting by creation date";
      case `/${paths.ROOT}/${paths.DASHBOARD}/${paths.JOB_POSTING}`:
        return "Displays your Job Posting Record in Details";
      case `/${paths.ROOT}/${paths.DASHBOARD}/${paths.JOB_REQUEST}`:
        return "";
      default:
        return "";
    }
  }, [location]);
  return (
    <div className="w-full h-7 bg-[#dae1f4]">
      <p className="font-bold text-md text-center w-full">{headlineText}</p>
    </div>
  );
};
