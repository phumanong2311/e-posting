import { IconTrash, IconPencil, IconChevronLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const MyJobPostingsDetailPage = () => {
  const navigate = useNavigate();

  const userInfo = {
    jobTitle: "Urgent Senior Project Manager with Fortune in 500 client",
    company: "Adobe",
    city: "San jose",
    state: "CA",
    workplaceTYpe: "Hybrid",
    employmentType: "Fulltime",
    requireYearOfExperience: "8",
    salary: "$100.000",
    totalComp: "$1.250",
    closingDate: "2/30/2025",
    jobDescription:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    requiredSkills: "Java, React, MongoDB, NodeJS",
  };
  return (
    <div className="w-full flex justify-center items-center mt-10 pb-[100px]">
      <div className="w-full px-16">
        <p
          className="flex text-lg items-center w-full justify-end text-purple-500 cursor-pointer "
          onClick={() => navigate("/dashboard/my-job-postings")}
        >
          <IconChevronLeft /> back to list
        </p>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Job Title:
            </p>
            <p className="text-lg ml-3 font-bold">{userInfo.jobTitle}</p>
          </div>
          <div className="flex gap-3">
            <IconPencil />
            <IconTrash />
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Company:
            </p>
            <p className="text-lg ml-3">{userInfo.company}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              City:{" "}
            </p>
            <p className="text-lg ml-3">{userInfo.city}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              State:{" "}
            </p>
            <p className="text-lg ml-3">{userInfo.state}</p>
          </div>
          <div>
            {/* <p className="text-lg ml-3 text-gray-400">
              (Job Title from profile)
            </p> */}
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Workplace Type:
            </p>
            <p className="text-lg ml-3">{userInfo.workplaceTYpe}</p>
          </div>
          <div>
            {/* <p className="text-lg ml-3 text-gray-400">
              (local, google, linkedin)
            </p> */}
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Employment Type:
            </p>
            <p className="text-lg ml-3">{userInfo.employmentType}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Required years of experience:
            </p>
            <p className="text-lg ml-3">{userInfo.requireYearOfExperience}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Salary:
            </p>
            <p className="text-lg ml-3">{userInfo.salary}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Salary:
            </p>
            <p className="text-lg ml-3">{userInfo.salary}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Total Comp:
            </p>
            <p className="text-lg ml-3">{userInfo.totalComp}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Closing Date:
            </p>
            <p className="text-lg ml-3">{userInfo.closingDate}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Job Description:
            </p>
            <p className="text-lg ml-3">{userInfo.jobDescription}</p>
          </div>
          <div></div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex items-center">
            <p className="font-bold text-lg text-right min-w-[200px] max-w-[200px]">
              Required Skills
            </p>
            <p className="text-lg ml-3">{userInfo.requiredSkills}</p>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MyJobPostingsDetailPage;
