import { useMemo } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { paths } from "../types";
import { SubMenuItem } from "../types/Menu";
import { SubMenu } from "../ui";

const ContentManagement = () => {
  const location = useLocation();
  const contentSubMenuItem: SubMenuItem[] = useMemo(() => {
    return [
      {
        label: "List of Active Contents",
        path: `/${paths.ROOT}/${paths.CONTENT_MANAGEMENT}/${paths.LIST_OF_ACTIVE_CONTENTS}`,
        isActive: location.pathname.includes(paths.LIST_OF_ACTIVE_CONTENTS),
      },
      {
        label: "Create New Content",
        path: `/${paths.ROOT}/${paths.CONTENT_MANAGEMENT}/${paths.CREATE_CONTENT}`,
        isActive: location.pathname.includes(paths.CREATE_CONTENT),
      },
      {
        label: "Inactive Contents",
        path: `/${paths.ROOT}/${paths.CONTENT_MANAGEMENT}/${paths.LIST_OF_INACTIVE_CONTENTS}`,
        isActive: location.pathname.includes(paths.LIST_OF_INACTIVE_CONTENTS),
      },
    ];
  }, [location])

  return (
    <>
      <SubMenu subMenuItem={contentSubMenuItem} />
      <Outlet />
      <Navigate to={`/${paths.ROOT}/${paths.CONTENT_MANAGEMENT}/${paths.LIST_OF_ACTIVE_CONTENTS}`} />
    </>
  );
};
export default ContentManagement;
