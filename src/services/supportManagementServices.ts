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
    ticketProcessStatus?: TicketProcessStatus;
    priorityLevel?: TicketPriorityLevel;
  }): Promise<ResponseWrapper> {
    let url =
      `supports?` +
      buildQueryParams({
        page,
        supportTicketStatus,
        mainTopic,
        ticketProcessStatus,
        priorityLevel,
      });
    return this.getAPI(url);
  }
  //   async getSkills({
  //     keyword = "",
  //     page = 1,
  //   }: {
  //     keyword?: string;
  //     page?: number;
  //   }): Promise<ResponseWrapper> {
  //     let url = `skills?` + buildQueryParams({ keyword, page });
  //     return this.getAPI(url);
  //   }

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
