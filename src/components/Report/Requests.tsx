import { NavLink } from "react-router-dom";
import { paths } from "../../types";

const Requests = () => {
  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="w-full px-16">
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">1 - </p>
            <NavLink
              to={`/${paths.ROOT}/${paths.REPORTING}/${paths.REPORT_REQUESTS_BY_DAY}`}
              className="text-lg ml-3"
            >
              {" "}
              Requests Created by Day
            </NavLink>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">2 - </p>
            <NavLink
              to={`/${paths.ROOT}/${paths.REPORTING}/${paths.REPORT_REQUESTS_TOP_POSTERS}`}
              className="text-lg ml-3"
            >
              Top 20 Request Posters
            </NavLink>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">3 - </p>
            <NavLink
              to={`/${paths.ROOT}/${paths.REPORTING}/${paths.REPORT_REQUESTS_TOP_COMPANIES}`}
              className="text-lg ml-3"
            >
              Top Companies By Request Posts
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requests;
