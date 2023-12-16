import { Link, Outlet } from "react-router-dom";
import { Divider } from "@mantine/core";

import Header from "../components/Header";
import HeadlineText from "../components/HeadlineText";
import Footer from "../components/Footer";
const DashboardPage = ({ children }) => {
  return (
    <div className="h-screen w-full flex flex-col">
      <HeadlineText text="Display your User information form user account and profile from account used to login to admin portal (whoami page)" />
      <Header containerClass="mt-12 px-16" />
      <div className="w-full flex mt-4 px-16">
        <Link to="/dashboard/my-profile" className="mr-4">
          <p className="text-lg font-bold text-black">My Profile</p>
        </Link>
        <Divider orientation="vertical" />
        <Link to="/dashboard/my-job-postings" className="mx-4">
          <p className="text-lg text-purple-800">My Job Postings</p>
        </Link>
        <Divider orientation="vertical" />
        <Link to="/dashboard/my-job-requests" className="mx-4">
          <p className="text-lg text-purple-800">My Job Requests</p>
        </Link>
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default DashboardPage;
