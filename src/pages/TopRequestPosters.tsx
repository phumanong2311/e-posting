import { useState, useEffect } from "react";
import { requestService } from "../services";
// import { Request } from "../types";


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

const TopRequestPosters = () => {
  const [month, setMonth] = useState<number>(getMonth());
  const [year, setYear] = useState<number>(getYear());
  const [topRequestPosters, setTopRequestPosters] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  useEffect(() => {
    const fetchTopRequestPosters = async () => {
      try {
        const posters = await requestService.getTopRequestPosters(month, year, startDate, endDate);
        setTopRequestPosters(posters);
      } catch (error) {
        console.error("Error fetching top request posters:", error);
      }
    };

    fetchTopRequestPosters();
  }, [month, year, startDate, endDate]);

  const currentDate = new Date();
  // const currentMonthYear = currentDate.toLocaleString('en-US', { month: 'short', year: 'numeric' });

  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="flex items-center justify-center mb-4">
        {/* <p className="mr-2">{currentMonthYear}</p> */}
        <div className="p-2 mr-2 flex flex-col items-center">
          <label className="mr-2">Start Date:</label>
          <input
            type="date"
            value={startDate ? startDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : undefined)}
            className="border p-2 mr-2"
          />
        </div>
        <div className="p-2 mr-2 flex flex-col items-center">
          <label className="mr-2">End Date:</label>
          <input
            type="date"
            value={endDate ? endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : undefined)}
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
      <table className="border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Ranking</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Number of Request Postings</th>
          </tr>
        </thead>
        <tbody>
          {topRequestPosters.map((poster, index) => (
            <tr key={poster.requestOwner}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{poster.requestOwner}</td>
              <td className="border p-2">{poster.numPostings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopRequestPosters;
