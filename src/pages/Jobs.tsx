import { Link } from "react-router-dom";

const Jobs = () => {
  return (
    <div className="w-full flex justify-center items-center mt-20">
      <div className="w-full px-16">
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              1 - {" "}
            </p>
            <Link to="/admin/reporting/jobs/by-day" className="text-lg ml-3"> Jobs Created by Day</Link>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              2 - {" "}
            </p>
            <Link to="/admin/reporting/jobs/top-posters" className="text-lg ml-3">Top 20 Job Posters</Link>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              3 - {" "}
            </p>
            <Link to="/admin/reporting/jobs/top-companies" className="text-lg ml-3">Top Companies By Job Posts</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
