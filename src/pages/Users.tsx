import { Link } from "react-router-dom";

const Users = () => {
  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="w-full px-16">
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              1 - {" "}
            </p>
            <Link to="/admin/reporting/users/by-day" className="text-lg ml-3"> User Accounts Created by Day</Link>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              2 - {" "}
            </p>
            <Link to="/admin/reporting/users/total" className="text-lg ml-3">Total Accounts by Creation Method</Link>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              3 - {" "}
            </p>
            <Link to="/admin/reporting/users/by-month" className="text-lg ml-3">Total Accounts by Creation Method Each Month</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
