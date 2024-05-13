import { useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { paths } from "../types";
import { SubMenu } from "../ui";

const ReportingPage = () => {

  const location = useLocation();
  const dashboardLinks = useMemo(() => {
    return [
      {
        label: "Jobs",
        path: `/${paths.ROOT}/${paths.REPORTING}/${paths.REPORT_JOBS}`,
        isActive: location.pathname.includes(paths.REPORT_JOBS),
      },
      {
        label: "Requests",
        path: `/${paths.ROOT}/${paths.REPORTING}/${paths.REPORT_REQUESTS}`,
        isActive: location.pathname.includes(paths.REPORT_REQUESTS),
      },
      {
        label: "Users",
        path: `/${paths.ROOT}/${paths.REPORTING}/${paths.REPORT_USERS}`,
        isActive: location.pathname.includes(paths.REPORT_USERS),
      },
      {
        label: "Notifications",
        path: `/${paths.ROOT}/${paths.REPORTING}/${paths.REPORT_NOTIFICATIONS}`,
        isActive: location.pathname.includes(paths.REPORT_NOTIFICATIONS),
      },
    ];
  }, [location]);

  return (
    <>
      <SubMenu subMenuItem={dashboardLinks} />
      <Outlet />
      <Navigate to={`/${paths.ROOT}/${paths.REPORTING}/${paths.REPORT_JOBS}`} />
    </>
  );
};

export default ReportingPage
