import { ResponseWrapper } from "../types";
import { buildQueryParams } from "../utils";
import { API } from "./api";

class JobService extends API {
  async getJobs({ page = 1 }: { page?: number }): Promise<ResponseWrapper> {
    const url = `job?page=${page}`;
    return this.getAPI(url);
  }

  async getMyJobs({ page = 1 }: { page?: number }): Promise<ResponseWrapper> {
    const url = `/job/user/my-jobs?page=${page}`;
    return this.getAPI(url);
  }

  async getJobByOwner({ ownerId = "", page = 1, excludeJobPostId = "" }) {
    //TODO: Call to api GET /job/owner/:ownerId
    const url = `job/owner/${ownerId}?page=${page}&excludeJobPostId=${excludeJobPostId}`;
    return this.getAPI(url);
  }

  async getJobSearch({
    workLocationType = "",
    employmentType = "",
    yearsOfExperience = "",
    closingDate = "",
    keyword = "",
    page = 1,
  }): Promise<ResponseWrapper> {
    const url =
      `job/search?` +
      buildQueryParams({
        workLocationType,
        employmentType,
        yearsOfExperience,
        closingDate,
        keyword,
        page,
      });
    return this.getAPI(url);
  }

  async getJobDetail({ jobId = "" }): Promise<ResponseWrapper> {
    const url = `job/${jobId}`;
    return this.getAPI(url);
  }

  async getListJob(payload: any) {
    return this.getAPI("job", { ...payload });
  }

  async editJob(id: string, payload: any) {
    const url = `job/${id}`;
    return this.putAPI(url, { ...payload });
  }

  async deleteJob(id: string) {
    const url = `job/${id}`;
    return this.deleteAPI(url);
  }
}

const jobService = new JobService();

export default jobService;
