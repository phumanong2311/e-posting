import { useEffect, useMemo } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer, Header, HeadlineText } from ".";
import { useAppProviderCtx } from "../../app-provider/AppProvider";
import userService from "../../services/user.service";
import { ResponseWrapper, paths } from "../../types";

export const PageLayout = () => {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const {
    func: { updateUser },
    data: { user },
  } = useAppProviderCtx();
  const headlineText = useMemo(() => {
    switch (location.pathname) {
      case "/admin/search":
        return "Display your list of Job Request Results by creation date";
      case "/admin/dashboard/profile":
        return "Display your User information form user account and profile from account used to login to admin portal (whoami page)";
      case "/admin/dashboard/job-postings":
        return "Displays your list of Job Posting by creation date";
      case "/admin/dashboard/job-postings/detail":
        return "Displays your Job Posting Record in Details";
      case "/admin/dashboard/job-requests":
        return "";
      default:
        return "";
    }
  }, [location]);

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
    userService.getMe().then((res: ResponseWrapper) => {
      if (res.result) {
        updateUser(res.result);
      }
    });
    if ((location.pathname = paths.ROOT)) navigate("/admin/dashboard/profile");
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
