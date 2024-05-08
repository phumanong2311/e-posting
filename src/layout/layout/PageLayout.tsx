import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Header, HeadlineText } from ".";
import { useAppProviderCtx } from "../../app-provider/AppProvider";
import userService from "../../services/userServices";
import { ResponseWrapper, paths } from "../../types";

export const PageLayout = () => {
  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const {
    func: { updateUser },
    data: { user },
  } = useAppProviderCtx();

  useEffect(() => {
    if (!token) {
      window.location.href = `/${paths.LOGIN}`;
    }
    userService.getMe().then((res: ResponseWrapper) => {
      if (res.result) {
        updateUser(res.result);
      }
    });
    if (location.pathname === paths.ROOT)
      navigate(`/${paths.ROOT}/${paths.DASHBOARD}/${paths.PROFILE}`);
  }, [token]);

  if (!user) return <></>;
  return (
    <>
      <div className="min-h-screen h-auto w-full flex flex-col">
        <HeadlineText />
        <Header containerClass="mt-12 px-16" />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
