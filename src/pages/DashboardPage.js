import { useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Divider } from "@mantine/core";

import Header from "../components/Header";
import HeadlineText from "../components/HeadlineText";
import Footer from "../components/Footer";
const DashboardPage = ({ children }) => {
  const location = useLocation();
  const dashboardLinks = useMemo(() => {
    return [
      {
        label: "My Profile",
        path: "/dashboard/my-profile",
        isActive: location.pathname.includes("/my-profile"),
      },
      {
        label: "My Job Postings",
        path: "/dashboard/my-job-postings",
        isActive: location.pathname.includes("/my-job-postings"),
      },
      {
        label: "My Job Requests",
        path: "/dashboard/my-job-requests",
        isActive: location.pathname.includes("/my-job-requests"),
      },
    ];
  }, [location]);
  const headlineText = useMemo(() => {
    switch (location.pathname) {
      case "/dashboard/my-profile":
        return "Display your User information form user account and profile from account used to login to admin portal (whoami page)";
      case "/dashboard/my-job-postings":
        return "Displays your list of Job Posting by creation date";
      case "/dashboard/my-job-postings/detail":
        return "Displays your Job Posting Record in Details";
      case "/dashboard/my-job-requests":
        return "";
      default:
        return "";
    }
  }, [location]);

  return (
    <div className="h-screen w-full flex flex-col">
      <HeadlineText text={headlineText} />
      <Header containerClass="mt-12 px-16" />
      <div className="w-full flex mt-4 px-16">
        {dashboardLinks.map((link, index) => (
          <>
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
          </>
        ))}
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default DashboardPage;
