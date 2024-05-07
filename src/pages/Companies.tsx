import { Link } from "react-router-dom";

const Companies = () => {
  return (
    <div className="w-full flex justify-center items-center mt-20">
      <div className="w-full px-16">
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              1 - {" "}
            </p>
            <Link to="/admin/reporting/companies/by-day" className="text-lg ml-3"> Companies Created by Day</Link>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              2 - {" "}
            </p>
            <Link to="/admin/reporting/companies/top-posters" className="text-lg ml-3">Top 20 Company Posters</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
