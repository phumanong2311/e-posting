import { ResponseWrapper } from "../types";
import {
  SupportTicketStatus,
  TicketPriorityLevel,
  TicketProcessStatus,
} from "../types/enums/SupportTicketStatus";
import { buildQueryParams } from "../utils";
import { API } from "./api";

class SupportManagementService extends API {
  async getContactTopics(): Promise<ResponseWrapper> {
    let url = `contact-topics`;
    return this.getAPI(url);
  }

  async getSupportTickets({
    page = 1,
    supportTicketStatus = SupportTicketStatus.ALL,
    mainTopic,
    ticketProcessStatus,
    priorityLevel,
  }: {
    page?: number;
    supportTicketStatus?: SupportTicketStatus;
    mainTopic?: string;
    ticketProcessStatus?: TicketProcessStatus | string;
    priorityLevel?: TicketPriorityLevel | string;
  }): Promise<ResponseWrapper> {
    let url =
      `support?` +
      buildQueryParams({
        page,
        supportTicketStatus,
        mainTopic,
        ticketProcessStatus,
        priorityLevel,
      });
    return this.getAPI(url);
  }

  async getSupportTicketDetail(id: string): Promise<ResponseWrapper> {
    let url = `support/${id}`;
    return this.getAPI(url);
  }

  async updateSupportTicketStatus({
    supportTicketId,
    supportTicketStatus,
    priorityLevel,
  }: {
    supportTicketId: string;
    supportTicketStatus: number;
    priorityLevel: number;
  }): Promise<ResponseWrapper> {
    let url = `support/${supportTicketId}`;
    return this.putAPI(url, {
      supportTicketStatus,
      priorityLevel,
    });
  }

  async getUserReports({
    page = 1,
    reportingUser,
    reportedUser,
    reportTopic,
  }: {
    page?: number;
    reportingUser?: string;
    reportedUser?: string;
    reportTopic?: string;
  }): Promise<ResponseWrapper> {
    let url =
      `reporting?` +
      buildQueryParams({ page, reportingUser, reportedUser, reportTopic });
    return this.getAPI(url);
  }

  async getUserMisconducts({
    page = 1,
    userId,
    keyword,
  }: {
    page?: number;
    userId?: string;
    keyword?: string;
  }): Promise<ResponseWrapper> {
    let url = "reporting/user/list?" + buildQueryParams({ page });
    if (userId || keyword) {
      url =
        ` reporting/user/user-query?` +
        buildQueryParams({ page, userId, keyword });
    }
    return this.getAPI(url);
  }

  async updateUserMisconduct({
    misconductId,
    userName,
    numberOfReports,
  }: {
    misconductId: string;
    userName: string;
    numberOfReports: number;
  }) {
    let url = `record/user/${misconductId}`;
    return this.putAPI(url, {
      userName,
      numberOfReports,
    });
  }

  //   async getSkillDetail(id: string): Promise<ResponseWrapper> {
  //     const url = `skills/${id}`;
  //     return this.getAPI(url);
  //   }

  //   async createSkill(skill: Skill) {
  //     const url = `skills`;
  //     return this.postAPI(url, skill);
  //   }

  //   async editSkill(id: string, payload: any) {
  //     const url = `skills/${id}`;
  //     return this.putAPI(url, { ...payload });
  //   }
}

const supportManagementService = new SupportManagementService();

export default supportManagementService;
