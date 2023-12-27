import { Divider } from "@mantine/core";
import { useMemo } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import HeadlineText from "../components/HeadlineText";
const DashboardPage = () => {
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
  const headlineText = useMemo(() => {
    switch (location.pathname) {
      case "/dashboard/profile":
        return "Display your User information form user account and profile from account used to login to admin portal (whoami page)";
      case "/dashboard/job-postings":
        return "Displays your list of Job Posting by creation date";
      case "/dashboard/job-postings/detail":
        return "Displays your Job Posting Record in Details";
      case "/dashboard/job-requests":
        return "";
      default:
        return "";
    }
  }, [location]);

  return (
    <>
      <div className="min-h-screen h-auto w-full flex flex-col">
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
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
