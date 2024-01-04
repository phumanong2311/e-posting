import { ResponseWrapper } from "../types/ResponseWrapper";
import { API } from "./api";

class JobService extends API {
  async getJobs({ page = 1 }: { page?: number }): Promise<ResponseWrapper> {
    const url = `/job?page=${page}`;
    return this.getAPI(url);
  }

  async getJobByOwner({ ownerId = "", page = 1, excludeJobPostId = "" }) {
    //TODO: Call to api GET /job/owner/:ownerId
    const url = `/job/owner/${ownerId}?page=${page}&excludeJobPostId=${excludeJobPostId}`;
    return this.getAPI(url);
  }

  async getJobSearch({
    workLocationType = "",
    employmentType = "",
    yearsOfExperience = "",
    closingDate = "",
    keywords = "",
  }): Promise<ResponseWrapper> {
    const url = `/job/search?workLocationType=${workLocationType}&employmentType=${employmentType}&yearsOfExperience=${yearsOfExperience}&closingDate=${closingDate}&keywords=${keywords}`;
    return this.getAPI(url);
  }

  async getJobDetail({ jobId = "" }): Promise<ResponseWrapper> {
    const url = `/job/${jobId}`;
    return this.getAPI(url);
  }

  async getListJob(payload: any) {
    return this.getAPI("/job", { ...payload });
  }
}

const jobService = new JobService();

export default jobService;
