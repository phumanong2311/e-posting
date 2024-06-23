import { useState } from "react";
import UserBalanceList from "./UserBalanceList";

const UserBalancePage = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <UserBalanceList />
    </div>
  );
};
export default UserBalancePage;
