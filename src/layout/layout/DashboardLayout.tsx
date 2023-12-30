import { Divider } from "@mantine/core";
import { Fragment, useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export const DashboardLayout = () => {
  const location = useLocation();
  const dashboardLinks = useMemo(() => {
    return [
      {
        label: "My Profile",
        path: "/dashboard/profile",
        isActive: location.pathname.includes("/profile"),
      },
      {
        label: "My Job Postings",
        path: "/dashboard/job-postings",
        isActive: location.pathname.includes("/job-postings"),
      },
      {
        label: "My Job Requests",
        path: "/dashboard/job-requests",
        isActive: location.pathname.includes("/job-requests"),
      },
    ];
  }, [location]);

  return (
    <>
      <div className="w-full flex mt-4 px-16">
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
      <Outlet />
    </>
  );
};
