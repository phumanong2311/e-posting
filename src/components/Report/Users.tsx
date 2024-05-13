import { NavLink } from "react-router-dom";
import { paths } from "../../types";

const Users = () => {
  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="w-full px-16">
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">1 - </p>
            <NavLink
              to={`/${paths.ROOT}/${paths.REPORTING}/${paths.REPORT_USERS_BY_DAY}`}
              className="text-lg ml-3"
            >
              {" "}
              User Accounts Created by Day
            </NavLink>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">2 - </p>
            <NavLink
              to={`/${paths.ROOT}/${paths.REPORTING}/${paths.REPORT_USERS_TOTAL}`}
              className="text-lg ml-3"
            >
              Total Accounts by Creation Method
            </NavLink>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">3 - </p>
            <NavLink
              to={`/${paths.ROOT}/${paths.REPORTING}/${paths.REPORT_USERS_BY_MONTH}`}
              className="text-lg ml-3"
            >
              Total Accounts by Creation Method Each Month
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
