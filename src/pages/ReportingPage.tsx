import { Divider } from "@mantine/core";
import { Fragment, useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const ReportingPage = () => {

  const location = useLocation();
  const dashboardLinks = useMemo(() => {
    return [
      {
        label: "Jobs",
        path: "/admin/reporting/jobs",
        isActive: location.pathname.includes("/jobs"),
      },
      {
        label: "Requests",
        path: "/admin/reporting/requests",
        isActive: location.pathname.includes("/requests"),
      },
      {
        label: "Users",
        path: "/admin/reporting/users",
        isActive: location.pathname.includes("/users"),
      },
      {
        label: "Notifications",
        path: "/admin/reporting/notifications",
        isActive: location.pathname.includes("/notifications"),
      },
    ];
  }, [location]);

  return (
    <>
      <div className="w-full flex mt-4 px-16 mb-8">
        <div className="w-full flex">
          {dashboardLinks.map((link, index) => (
            <Fragment key={index}>
              <Link
                to={link.path}
                className={
                  index === 0
                    ? "mr-4"
                    : index === dashboardLinks.length - 1
                    ? "ml-4"
                    : "mx-4"
                }
              >
                <p
                  className={`text-lg ${
                    link.isActive
                      ? "text-black font-bold"
                      : "text-purple-800 font-normal"
                  }`}
                >
                  {link.label}
                </p>
              </Link>
              {index !== dashboardLinks.length - 1 && (
                <Divider orientation="vertical" />
              )}
            </Fragment>
          ))}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default ReportingPage
