import { ResponseWrapper, SearchParameter } from '../types'
import { buildQueryParams } from '../utils'
import { API } from './api'


class JobService extends API {
  async getJobs({
    searchParameter,
    page = 1,
  }: {
    searchParameter: SearchParameter
    page?: number
  }): Promise<ResponseWrapper> {
    const url = `job?` + buildQueryParams({ ...searchParameter, page })
    return this.getAPI(url)
  }

  async getMyJobs({ page = 1 }: { page?: number }): Promise<ResponseWrapper> {
    const url = `job/user/my-jobs?page=${page}`
    return this.getAPI(url)
  }

  async getMyJobsRequest({
    page = 1,
  }: {
    page?: number
  }): Promise<ResponseWrapper> {
    const url = `resources/user/requests?page=${page}`
    return this.getAPI(url)
  }

  async getJobByOwner({ ownerId = '', page = 1, excludeJobPostId = '' }) {
    //TODO: Call to api GET /job/owner/:ownerId
    const url = `job/owner/${ownerId}?page=${page}&excludeJobPostId=${excludeJobPostId}`
    return this.getAPI(url)
  }

  async getJobSearch({
    searchParameter,
    page = 1,
    keyword = '',
  }: {
    searchParameter: SearchParameter
    page?: number
    keyword: string
  }): Promise<ResponseWrapper> {
    const url =
      `job/search?` +
      buildQueryParams({
        ...searchParameter,
        keyword,
        page,
      })
    return this.getAPI(url)
  }

  async getJobDetail({ jobId = '' }): Promise<ResponseWrapper> {
    const url = `job/${jobId}`
    return this.getAPI(url)
  }

  async getListJob(payload: any) {
    return this.getAPI('job', { ...payload })
  }

  async editJob(id: string, payload: any) {
    const url = `job/${id}`
    return this.putAPI(url, { ...payload })
  }

  async deleteJob(id: string) {
    const url = `job/${id}`
    return this.deleteAPI(url)
  }

  async getTopJobPosters(month: number, year: number, startDate?: Date, endDate?: Date): Promise<{ jobOwner: string; numPostings: number }[]> {
    let currentPage = 1;
    let allJobPosters: any[] = [];

    while (true) {
        const allJobsResponse = await this.getJobs({ searchParameter: {}, page: currentPage });
        if (!allJobsResponse.success || !allJobsResponse.result) {
            break;
        }

        const jobs = allJobsResponse.result.jobs;
        const currentMonthJobs = jobs.filter((job: any) => {
            const jobDate = new Date(job.createdAt);
            return jobDate.getMonth() + 1 === month && jobDate.getFullYear() === year;
        });

        allJobPosters = [...allJobPosters, ...currentMonthJobs];

        currentPage++;

        if (jobs.length < 20) {
            break;
        }
    }

    if (startDate) {
        allJobPosters = allJobPosters.filter((job: any) => new Date(job.createdAt) >= startDate);
    }
    if (endDate) {
        allJobPosters = allJobPosters.filter((job: any) => new Date(job.createdAt) <= endDate);
    }

    const jobPosters: Record<string, number> = {};
    allJobPosters.forEach((job) => {
        const jobOwner = job.jobOwner;
        jobPosters[jobOwner] = (jobPosters[jobOwner] || 0) + 1;
    });

    const topJobPosters = Object.keys(jobPosters).map((jobOwner) => ({
        jobOwner,
        numPostings: jobPosters[jobOwner],
    }));
    topJobPosters.sort((a, b) => b.numPostings - a.numPostings);

    return topJobPosters.slice(0, 20);
  }
}


const jobService = new JobService()

export default jobService
