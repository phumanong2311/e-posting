import { useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, Header, HeadlineText } from ".";
import { useAppProviderCtx } from "../../app-provider/AppProvider";
import userService from "../../services/user.service";
import { ResponseWrapper } from "../../types/ResponseWrapper";

export const PageLayout = () => {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const {
    func: { updateUser },
    data: { user },
  } = useAppProviderCtx();
  const headlineText = useMemo(() => {
    switch (location.pathname) {
      case "/search":
        return "Display your list of Job Request Results by creation date";
      case "/dashboard/profile":
        return "Display your User information form user account and profile from account used to login to admin portal (whoami page)";
      case "/dashboard/job-postings":
        return "Displays your list of Job Posting by creation date";
      case "/dashboard/job-postings/detail":
        return "Displays your Job Posting Record in Details";
      case "/dashboard/job-requests":
        return "";
      default:
        return "";
    }
  }, [location]);

  useEffect(() => {
    userService.getMe().then((res: ResponseWrapper) => {
      if (res.result) {
        updateUser(res.result);
      }
    });
  }, [token]);

  if (!user) return <></>;
  return (
    <>
      <div className="min-h-screen h-auto w-full flex flex-col">
        <HeadlineText text={headlineText} />
        <Header containerClass="mt-12 px-16" />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
