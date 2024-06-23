import { useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { paths } from "../types";
import { SubMenu } from "../ui";

const FinancePage = () => {
  const location = useLocation();
  const financeTabs = useMemo(() => {
    return [
      {
        label: "Withdraw Request",
        path: `/${paths.ROOT}/${paths.FINANCE}/${paths.WITHDRAW}`,
        isActive: location.pathname.includes(paths.WITHDRAW),
      },
      {
        label: "User Balances",
        path: `/${paths.ROOT}/${paths.FINANCE}/${paths.BALANCE}`,
        isActive: location.pathname.includes(paths.BALANCE),
      },
    ];
  }, [location]);

  return (
    <>
      <SubMenu subMenuItem={financeTabs} />
      <Outlet />
    </>
  );
};

export default FinancePage;
