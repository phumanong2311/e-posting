import { Job } from ".";

export type PaginationObject = {
  maxPages?: number;
  offset?: number;
  page: number;
  pageSize?: number;
  totalJobs?: number;
  jobs: Job[];
};
