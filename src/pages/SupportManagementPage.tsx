import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { paths } from "../types";
import { SubMenu } from "../ui";

const SupportManagementPage = () => {
  const location = useLocation();
  const supportTabs = useMemo(() => {
    return [
      {
        label: "Support Ticket Manager",
        path: `/${paths.ROOT}/${paths.SUPPORT_MANAGEMENT}/${paths.SUPPORT_TICKET_MANAGER}`,
        isActive: location.pathname.includes(paths.SUPPORT_TICKET_MANAGER),
      },
      {
        label: "User Conduct Manager",
        path: `/${paths.ROOT}/${paths.SUPPORT_MANAGEMENT}/${paths.USER_CONDUCT_MANAGER}`,
        isActive: location.pathname.includes(paths.USER_CONDUCT_MANAGER),
      },
    ];
  }, [location]);

  return (
    <>
      <SubMenu subMenuItem={supportTabs} />
      <Outlet />
    </>
  );
};

export default SupportManagementPage;
