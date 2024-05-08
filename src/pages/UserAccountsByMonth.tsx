import { useState, useEffect } from "react";
import { userServices } from "../services";
import { User } from "../types";

const UserAccountsByMonth = () => {
  const [selectedProvider, setSelectedProvider] = useState<string>("local");
  const [monthlyUserCounts, setMonthlyUserCounts] = useState<Record<string, number>>({});

  const fetchUsers = async () => {
    let currentPage = 1;
    let allUsers: User[] = [];

    while (true) {
      const allUsersResponse = await userServices.getUsers({ page: currentPage });
      if (!allUsersResponse.result) {
        break;
      }

      const users = allUsersResponse.result.users;

      allUsers = [...allUsers, ...users];
      currentPage++;

      if (users.length < 20) {
        break;
      }
    }

    return allUsers;
  };

  useEffect(() => {
    const fetchUserCountsByMonth = async () => {
      const allUsers = await fetchUsers();
      const userCountsByMonth: Record<string, number> = {};
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();

      for (let i = 0; i < 12; i++) {
        const month = i + 1;
        const startDate = new Date(currentYear, i, 1);
        const endDate = new Date(currentYear, i + 1, 0);

        const usersInMonth = allUsers.filter(user => {
          const userDate = new Date(user.createdAt);
          return userDate >= startDate && userDate <= endDate && user.provider === selectedProvider;
        });

        userCountsByMonth[`${month}/${currentYear}`] = usersInMonth.length;
      }

      setMonthlyUserCounts(userCountsByMonth);
    };

    fetchUserCountsByMonth();
  }, [selectedProvider]);

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full text-center overflow-x-auto pt-5">
      <div className="p-2 mb-4">
        <label htmlFor="providerSelect">Select Creation Method:</label>
        <select id="providerSelect" value={selectedProvider} onChange={handleProviderChange} className="border p-2 ml-2">
          <option value="local">Local</option>
          <option value="google">Google</option>
          <option value="linkedin">LinkedIn</option>
        </select>
      </div>
      <table className="border-collapse border" style={{ minWidth: "600px" }}>
        <thead>
          <tr>
            <th className="border p-2">Month</th>
            <th className="border p-2">Users Created</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(monthlyUserCounts).map(([month, count]) => (
            <tr key={month}>
              <td className="border p-2">{month}</td>
              <td className="border p-2">{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserAccountsByMonth;
