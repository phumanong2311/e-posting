import { Job } from "./Job";

export type JobPagination = {
  maxPages: number;
  offset: number;
  page: number;
  pageSize: number;
  totalJobs: number;
  jobs: Job[];
};
