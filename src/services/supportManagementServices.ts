import { ResponseWrapper, Skill } from "../types";
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
