import { Link } from "react-router-dom";

const Requests = () => {
  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="w-full px-16">
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              1 - {" "}
            </p>
            <Link to="/admin/reporting/requests/by-day" className="text-lg ml-3"> Requests Created by Day</Link>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              2 - {" "}
            </p>
            <Link to="/admin/reporting/requests/top-posters" className="text-lg ml-3">Top 20 Request Posters</Link>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              3 - {" "}
            </p>
            <Link to="/admin/reporting/requests/top-companies" className="text-lg ml-3">Top Companies By Request Posts</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Requests;
