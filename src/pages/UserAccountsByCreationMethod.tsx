import { useState, useEffect } from "react";
import { userServices } from "../services";
import { User } from "../types";


const UserAccountsByCreationMethod = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [usersByProvider, setUsersByProvider] = useState<Record<string, number>>({
    "local": 0,
    "google": 0,
    "linkedin": 0
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const fetchUsers = async () => {
    let currentPage = 1;
    let allUserPosters: any[] = [];

    while (true) {
      const allUsersResponse = await userServices.getUsers({ page: currentPage });
      if (!allUsersResponse.result) {
        break;
      }

      const users = allUsersResponse.result.users;

      const filteredUsers = users.filter((user: any) => {
        const userDate = new Date(user.createdAt);
        return (!startDate || userDate >= startDate) && (!endDate || userDate <= endDate);
      });

      allUserPosters = [...allUserPosters, ...filteredUsers];
      currentPage++;

      if (users.length < 20) {
        break;
      }
    }

    setUsers(allUserPosters);
  };

  useEffect(() => {
    fetchUsers();
  }, [startDate, endDate]);

  useEffect(() => {
    const countUsersByProvider = () => {
      const usersCountByProvider: Record<string, number> = {
        "local": 0,
        "google": 0,
        "linkedin": 0
      };
      users.forEach(user => {
        const provider = user.provider;
        usersCountByProvider[provider] += 1;
      });
      setUsersByProvider(usersCountByProvider);
    };
    countUsersByProvider();
  }, [users]);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center overflow-x-auto pt-5">
      <div className="flex items-center justify-center mb-4">
        <div className="p-2 mr-2 flex flex-col items-center">
          <label htmlFor="startDate">Start Date</label>
          <input
            id="startDate"
            placeholder= "Start Date"
            type="date"
            value={startDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="border p-2 mr-2"
          />
        </div>
        <div className="p-2 mr-2 flex flex-col items-center">
          <label htmlFor="endDate">End Date</label>
          <input
            id="endDate"
            type="date"
            value={endDate?.toISOString().split('T')[0] || ''}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="border p-2 mr-2"
          />
        </div>
      </div>
      <table className="border-collapse border" style={{ minWidth: "600px" }}>
        <thead>
          <tr>
            <th className="border p-2">Sign-up Method</th>
            <th className="border p-2">Users Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(usersByProvider).map(([provider, count]) => (
            <tr key={provider}>
              <td className="border p-2">{provider}</td>
              <td className="border p-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAccountsByCreationMethod;
