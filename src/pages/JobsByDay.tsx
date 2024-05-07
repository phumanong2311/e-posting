import { useState, useEffect } from "react";
import { jobService } from "../services";
import { Job } from "../types";


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

const JobsByDay = () => {
  const [month, setMonth] = useState<number>(getMonth());
  const [year, setYear] = useState<number>(getYear());
  const [jobs, setJobs] = useState<Array<Job>>([]);
  const [jobsByDate, setJobsByDate] = useState<Record<string, number>>({});
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const fetchJobs = async () => {
    let currentPage = 1;
    let allJobPosters: any[] = [];

    while (true) {
      const allJobsResponse = await jobService.getListJob({ page: currentPage });
      if (!allJobsResponse.result) {
        break;
      }

      const jobs = allJobsResponse.result.jobs;

      const currentMonthPosters = jobs.filter((job: any) => {
        const jobDate = new Date(job.createdAt);
        return jobDate.getMonth() + 1 === month && jobDate.getFullYear() === year;
      });

      allJobPosters = [...allJobPosters, ...currentMonthPosters];
      currentPage++;

      if (jobs.length < 20) {
        break;
      }
    }

    setJobs(allJobPosters);
  };

  useEffect(() => {
    fetchJobs();
  }, [month, year]);

  const calculateJobsByDate = (jobList: Job[]) => {
    const jobsCountByDate: Record<string, number> = {};
    jobList.forEach((job) => {
      const jobDate = new Date(job.createdAt).getDate();
      jobsCountByDate[jobDate] = (jobsCountByDate[jobDate] || 0) + 1;
    });
    setJobsByDate(jobsCountByDate);
  };

  useEffect(() => {
    calculateJobsByDate(jobs);
  }, [jobs]);

  // const handleSearch = () => {
  //   const filteredJobs = jobs.filter((job) => {
  //     const jobDate = new Date(job.createdAt);
  //     return (!startDate || jobDate >= startDate) && (!endDate || jobDate <= new Date(endDate.getTime() + 86400000));
  //   });

  //   calculateJobsByDate(filteredJobs);
  // };

  const lastDayOfMonth = new Date(year, month, 0).getDate();
  const filteredDates = Array.from({ length: lastDayOfMonth }, (_, i) => i + 1).filter(date => {
    const currentDate = new Date(year, month - 1, date);
    return (!startDate || currentDate >= startDate) && (!endDate || currentDate <= new Date(endDate.getTime() + 86400000));
  });

  const currentDate = new Date();
  // const currentMonthYear = currentDate.toLocaleString('en-US', { month: 'short', year: 'numeric' });

  return (
    <div className="flex flex-col items-center justify-center h-full text-center overflow-x-auto pt-5">
      <div className="flex items-center justify-center mb-4">
        {/* <p className="mr-2">{currentMonthYear}</p> */}
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
        {/* <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Search
        </button> */}
      </div>
      <table className="border-collapse border" style={{ minWidth: "600px" }}>
        <thead>
          <tr>
            <th className="border p-2">Date</th>
            <th className="border p-2">Number of Job Postings</th>
          </tr>
        </thead>
        <tbody>
          {filteredDates.map((date) => (
            <tr key={date}>
              <td className="border p-2">{month}/{date}/{year}</td>
              <td className="border p-2">{jobsByDate[date] || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobsByDay;
