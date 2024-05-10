import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Footer, Header, HeadlineText } from ".";
import { useAppProviderCtx } from "../../app-provider/AppProvider";
import { userServices } from "../../services";
import { ResponseWrapper, paths } from "../../types";

export const PageLayout = () => {
  const token = localStorage.getItem("accessToken");
  const {
    func: { updateUser },
    data: { user },
  } = useAppProviderCtx();

  useEffect(() => {
    if (!token) {
      window.location.href = `/${paths.LOGIN}`;
    }
    userServices.getMe().then((res: ResponseWrapper) => {
      if (res.result) {
        updateUser(res.result);
      }
    });
  }, [token]);

  if (!user) return <></>;
  return (
    <>
      <div className="min-h-screen h-auto w-full flex flex-col">
        <HeadlineText />
        <Header containerClass="mt-12 px-16" />
        <Outlet />
        <Navigate to={`/${paths.ROOT}/${paths.DASHBOARD}/${paths.PROFILE}`} />
      </div>
      <Footer />
    </>
  );
};
