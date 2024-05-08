import { useState, useEffect } from "react";
import { requestServices } from "../services";
import { Request } from "../types";


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

const RequestsByDay = () => {
  const [month, setMonth] = useState<number>(getMonth());
  const [year, setYear] = useState<number>(getYear());
  const [requests, setRequests] = useState<Array<Request>>([]);
  const [requestsByDate, setRequestsByDate] = useState<Record<string, number>>({});
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  useEffect(() => {
    fetchRequests();
  }, [month, year]);

  const fetchRequests = async () => {
    let currentPage = 1;
    let allRequestPosters: any[] = [];
    while (true) {
      const allRequestsResponse = await requestServices.getRequests({ searchParameter: {}, page: currentPage });
      if (!allRequestsResponse.result) {
        break;
      }

      const requests = allRequestsResponse.result.requests;

      const currentMonthPosters = requests.filter((request: any) => {
        const requestDate = new Date(request.createdAt);
        return requestDate.getMonth() + 1 === month && requestDate.getFullYear() === year;
      });

      allRequestPosters = [...allRequestPosters, ...currentMonthPosters];
      currentPage++;

      if (requests.length < 20) {
        break;
      }
    }

    setRequests(allRequestPosters);
  };


  const calculateRequestsByDate = (requestList: Request[]) => {
    const requestsCountByDate: Record<string, number> = {};
    requestList.forEach((request) => {
      const requestDate = new Date(request.createdAt ? request.createdAt : '').getDate();
      requestsCountByDate[requestDate] = (requestsCountByDate[requestDate] || 0) + 1;
    });
    setRequestsByDate(requestsCountByDate);
  };

  useEffect(() => {
    calculateRequestsByDate(requests);
  }, [requests]);


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
            <th className="border p-2">Number of Request Postings</th>
          </tr>
        </thead>
        <tbody>
          {filteredDates.map((date) => (
            <tr key={date}>
              <td className="border p-2">{month}/{date}/{year}</td>
              <td className="border p-2">{requestsByDate[date] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsByDay;
