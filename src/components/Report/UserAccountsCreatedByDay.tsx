import { useEffect, useState } from "react";
import { userServices } from "../../services";
import { User } from "../../types";


function getMonth() {
  const currentDate = new Date();
  const month = currentDate.getMonth() + 1;
  return month;
}

function getYear() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  return year;
}

const UserAccountsCreatedByDay = () => {
  const [month, setMonth] = useState<number>(getMonth());
  const [year, setYear] = useState<number>(getYear());
  const [users, setUsers] = useState<Array<User>>([]);
  const [usersByDate, setUsersByDate] = useState<Record<string, number>>({});
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

      const currentMonthPosters = users.filter((user: any) => {
        const userDate = new Date(user.createdAt);
        return userDate.getMonth() + 1 === month && userDate.getFullYear() === year;
      });

      allUserPosters = [...allUserPosters, ...currentMonthPosters];
      currentPage++;

      if (users.length < 20) {
        break;
      }
    }

    setUsers(allUserPosters);
  };

  useEffect(() => {
    fetchUsers();
  }, [month, year]);

  const calculateUsersByDate = (userList: User[]) => {
    const usersCountByDate: Record<string, number> = {};
    userList.forEach((user) => {
      const userDate = new Date(user.createdAt).getDate();
      usersCountByDate[userDate] = (usersCountByDate[userDate] || 0) + 1;
    });
    setUsersByDate(usersCountByDate);
  };

  useEffect(() => {
    calculateUsersByDate(users);
  }, [users]);

  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const filteredDates = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1).filter(date => {
    const currentDate = new Date(year, month - 1, date);
    return (!startDate || currentDate >= startDate) && (!endDate || currentDate <= new Date(endDate.getTime() + 86400000));
  });
  const currentDate = new Date();


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
        <div className="p-2 mr-2 flex flex-col items-center">
          <label htmlFor="monthSelect">Select Month</label>
          <select id="monthSelect" value={month} onChange={(e) => setMonth(parseInt(e.target.value))} className="border p-2 mr-2">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="p-2 mr-2 flex flex-col items-center">
          <label htmlFor="yearSelect">Select Year</label>
          <select id="yearSelect" value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="border p-2 mr-2">
            {Array.from({ length: 10 }, (_, i) => currentDate.getFullYear() - 5 + i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
      </div>
      <table className="border-collapse border" style={{ minWidth: "600px" }}>
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Number of User Postings</th>
          </tr>
        </thead>
        <tbody>
          {filteredDates.map((date) => (
            <tr key={date}>
              <td className="border p-2">{month}/{date}/{year}</td>
              <td className="border p-2">{usersByDate[date] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default UserAccountsCreatedByDay;
