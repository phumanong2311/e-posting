import { TicketProcessStatus } from "./enums/SupportTicketStatus";

export class SupportTicket {
  userId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  mainTopic?: string;
  subTopic?: string;
  issueDetails?: string;
  systemGeneratedTicket?: boolean;
  userAcceptTOSAndPrivacyPolicy?: boolean;
  userType?: string;
  priorityLevel?: number;
  resolutionNotes?: string;
  assignedMemberId?: string;
  assignedMemberName?: string;
  ticketProcessStatus?: TicketProcessStatus;
  supportTicketStatus?: number;
  createdAt?: string;
  updatedAt?: string;
  supportTicketId?: string;
  status?: string;
}

export class SupportTicketPayload {
  assignedMemberId?: string;
  priorityLevel?: number;
  resolutionNotes?: string;
  supportTicketStatus?: number;
}

export class AssigneeProfile {
  firstName?: string;
  lastName?: string;
  profileId!: string;
}

export class AsssigneeArr {
  value!: string;
  label!: string;
}

export class Assignee {
  profile!: AssigneeProfile;
  id!: string;
}
