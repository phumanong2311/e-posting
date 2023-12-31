import { ResponseWrapper } from "../types/ResponseWrapper";
import { API } from "./api";

class UserService extends API {
  async getJobs({
    page = 1,
    workLocationType = "",
    yearOfExperience = "",
  }: {
    page?: number;
    workLocationType?: string;
    yearOfExperience?: string;
  }): Promise<ResponseWrapper> {
    //TODO: Call to api GET /job
    return new Promise((resolve, reject) => {
      resolve({
        timestamp: "2023-12-21T02:09:14.161Z",
        status: 200,
        success: true,
        result: {
          jobs: [
            {
              jobPostStatus: 0,
              favoritedCount: 0,
              applyCount: 0,
              _id: "6564cf10d11083608e90d030",
              jobOwnerId: "656637c0c50e7f30a07b75fe",
              jobOwner: "Zoe Leung",
              jobTitle: "Gainsight Administrator",
              description:
                "Responsibilities\n1. Understanding of Customer Success and how to streamline processes to speed adoption.\n2. Comfortable with basic programming and object...",
              company: "Amazon.com Inc.",
              city: "Seattle",
              state: "WA",
              country: "United States",
              workLocationType: "Hybrid",
              employmentType: "Full Time",
              yearsOfExperience: 7,
              baseSalary: 150,
              skills: ["Salesforce, Java, React JS"],
              totalCompensation: 1000,
              visibleTo: "Everyone",
              expireDate: "12/24/2023",
              createdAt: "2023-11-19T23:23:00.411Z",
              updatedAt: "2023-12-19T20:04:29.277Z",
              closingDate: "2024-05-17T23:23:00.411Z",
              archiveDate: "2024-06-16T20:04:29.277Z",
              viewCount: 4,
              questionnaire: [],
            },
            {
              jobPostStatus: 0,
              favoritedCount: 0,
              applyCount: 0,
              _id: "6564cf10d11083608e90d059",
              jobOwnerId: "656637c0c50e7f30a07b75fe",
              jobOwner: "Zoe Leung",
              jobTitle: "Gainsight Cloud Administrator",
              description:
                "Responsibilities\n1. Understanding of Customer Success and how to streamline processes to speed adoption.\n2...",
              company: "Amazon.com Inc.",
              city: "Seattle",
              state: "WA",
              country: "United States",
              workLocationType: "Hybrid",
              employmentType: "Full Time",
              yearsOfExperience: 7,
              baseSalary: 150,
              skills: ["Salesforce, Java, React JS"],
              totalCompensation: 1000,
              visibleTo: "Everyone",
              expireDate: "12/24/2023",
              createdAt: "2023-11-19T23:23:00.411Z",
              updatedAt: "2023-12-17T03:06:22.376Z",
              closingDate: "2024-05-17T23:23:00.411Z",
              archiveDate: "2024-06-14T03:06:22.376Z",
              viewCount: 5,
              questionnaire: [],
            },
          ],
          totalJobs: 2,
          page: 1,
          pageSize: 20,
          maxPages: 1,
          offset: 0,
        },
        message: "",
      });
    });
  }

  async getJobByOwner({ ownerId = "", page = 1, excludeJobPostId = "" }) {
    //TODO: Call to api GET /job/owner/:ownerId
    return new Promise((resolve, reject) =>
      resolve({
        timestamp: "2023-12-20T17:31:29.024Z",
        status: 200,
        success: true,
        result: {
          jobs: [
            {
              jobPostStatus: 0,
              favoritedCount: 0,
              applyCount: 0,
              _id: "6564cf10d11083608e90d02e",
              jobOwnerId: "657199daf5cc1d1a58e00579",
              jobOwner: "John Doe",
              jobTitle: "REMOTE Opportunity for Project Manager",
              description:
                "Description:\n\nManage established processes for the implementation of prioritized backlog items across AP products, coordinating within AP Delivery agile processes and across divisions to manage activity from requirements through solution implementation.\nOversee workload capacity for the internal design team, coordinate project timelines, budgetary needs, and effectively communicate project status with multiple internal stakeholders.\nMaintain constant knowledge of current and upcoming projects and manage communication around ...",
              company: "Akamai Technologies",
              city: "Cambridge",
              state: "MA",
              country: "United States",
              workLocationType: "Hybrid",
              employmentType: "Full Time",
              yearsOfExperience: 5,
              baseSalary: 150,
              skills: ["Salesforce, Java, React JS"],
              totalCompensation: 1250,
              visibleTo: "Everyone",
              expireDate: "12/24/2023",
              createdAt: "2023-11-19T23:23:00.411Z",
              updatedAt: "2023-12-20T16:37:29.773Z",
              closingDate: "2024-05-17T23:23:00.411Z",
              archiveDate: "2024-06-17T16:37:29.773Z",
              viewCount: 30,
              questionnaire: [],
            },
            {
              jobPostStatus: 0,
              favoritedCount: 0,
              applyCount: 0,
              _id: "6564cf10d11083608e90d02b",
              jobOwnerId: "655537b0c50e7f30a07b75fe",
              jobOwner: "William Chung",
              jobTitle: "Technical Project Manager with Salaesforce Experience",
              description:
                "Responsibilities:\n\nSingle point of contact for customer to manage all project responsibilities \nRun daily stand ups for ...",
              company: "Adobe Inc.",
              city: "San Jose",
              state: "CA",
              country: "United States",
              workLocationType: "Remote",
              employmentType: "Full Time",
              yearsOfExperience: 7,
              baseSalary: 150,
              skills: ["Salesforce, Java, React JS"],
              totalCompensation: 1000,
              visibleTo: "Everyone",
              expireDate: "11/24/2023",
              createdAt: "2023-11-19T23:23:00.411Z",
              updatedAt: "2023-12-15T08:59:46.572Z",
              closingDate: "2024-05-17T23:23:00.411Z",
              archiveDate: "2024-06-12T08:59:46.572Z",
              viewCount: 25,
              questionnaire: [],
            },
          ],
          totalJobs: 8,
          page: 1,
          pageSize: 2,
          maxPages: 4,
          offset: 0,
        },
      })
    );
  }

  async getJobSearch({
    workLocationType = "",
    employmentType = "",
    yearsOfExperience = "",
    closingDate = "",
    keywords = "",
  }) {
    //TODO: Call to api GET /job/search
    return new Promise((resolve, reject) =>
      resolve({
        timestamp: "2023-12-21T02:09:14.161Z",
        status: 200,
        success: true,
        result: {
          jobs: [
            {
              jobPostStatus: 0,
              favoritedCount: 0,
              applyCount: 0,
              _id: "6564cf10d11083608e90d030",
              jobOwnerId: "656637c0c50e7f30a07b75fe",
              jobOwner: "Zoe Leung",
              jobTitle: "Gainsight Administrator",
              description:
                "Responsibilities\n1. Understanding of Customer Success and how to streamline processes to speed adoption.\n2. Comfortable with basic programming and object...",
              company: "Amazon.com Inc.",
              city: "Seattle",
              state: "WA",
              country: "United States",
              workLocationType: "Hybrid",
              employmentType: "Full Time",
              yearsOfExperience: 7,
              baseSalary: 150,
              skills: ["Salesforce, Java, React JS"],
              totalCompensation: 1000,
              visibleTo: "Everyone",
              expireDate: "12/24/2023",
              createdAt: "2023-11-19T23:23:00.411Z",
              updatedAt: "2023-12-19T20:04:29.277Z",
              closingDate: "2024-05-17T23:23:00.411Z",
              archiveDate: "2024-06-16T20:04:29.277Z",
              viewCount: 4,
              questionnaire: [],
            },
            {
              jobPostStatus: 0,
              favoritedCount: 0,
              applyCount: 0,
              _id: "6564cf10d11083608e90d059",
              jobOwnerId: "656637c0c50e7f30a07b75fe",
              jobOwner: "Zoe Leung",
              jobTitle: "Gainsight Cloud Administrator",
              description:
                "Responsibilities\n1. Understanding of Customer Success and how to streamline processes to speed adoption.\n2...",
              company: "Amazon.com Inc.",
              city: "Seattle",
              state: "WA",
              country: "United States",
              workLocationType: "Hybrid",
              employmentType: "Full Time",
              yearsOfExperience: 7,
              baseSalary: 150,
              skills: ["Salesforce, Java, React JS"],
              totalCompensation: 1000,
              visibleTo: "Everyone",
              expireDate: "12/24/2023",
              createdAt: "2023-11-19T23:23:00.411Z",
              updatedAt: "2023-12-17T03:06:22.376Z",
              closingDate: "2024-05-17T23:23:00.411Z",
              archiveDate: "2024-06-14T03:06:22.376Z",
              viewCount: 5,
              questionnaire: [],
            },
          ],
          totalJobs: 2,
          page: 1,
          pageSize: 20,
          maxPages: 1,
          offset: 0,
        },
      })
    );
  }

  async getJobDetail({ jobId = "" }): Promise<ResponseWrapper> {
    //TODO: Call to api GET /job/{jobId}
    return new Promise((resolve, reject) =>
      resolve({
        timestamp: "2023-12-20T17:44:27.455Z",
        status: 200,
        success: true,
        message: "Job retrieved successfully",
        result: {
          _id: "6564cf10d11083608e90d02e",
          jobOwnerId: "655537b0c50e7f30a07b75fe",
          jobOwner: "William Chung",
          jobTitle: "REMOTE Opportunity for Project Manager",
          description:
            "Description:\n\nManage established processes for the implementation of prioritized backlog items across AP products, coordinating within AP Delivery agile processes and across divisions to manage activity from requirements through solution implementation.\nOversee workload capacity for the internal design team, coordinate project timelines, budgetary needs, and effectively communicate project status with multiple internal stakeholders.\nMaintain constant knowledge of current and upcoming projects and manage communication around shifting priorities with key stakeholders to ensure positive workflow.\nUtilize principles of project management and agile practices to achieve pace and maintain flexibility, promoting transparency and aligned stakeholder understanding, including\nRunning daily standup meetings with associated teams to track progress, assess risks, and stay consistently informed on the progress of all projects. Resolve any issues with appropriate stakeholders.\nProduce reporting that speaks to the teams' output and capacity.\nMaintain Jira tickets and Smartsheet progress tracker in support of multiple projects, while making suggestions for improvements and efficiencies.\nEngage with internal and external stakeholders to generate project estimates, scope or budget as necessary, and manage purchase orders, approvals, invoices and tracking in relation to projects produced through Vendor Management.\nProactively drive process improvements that will enable the teams to be efficient and ensure quality.\nEnhance and formalize standard operating procedures and capacity forecasting, while driving awareness of processes and planning protocol for work requests.\nAnalyze options with a particular focus on rapid clarification and resolution of complex or emergent issues, including costs, challenges, benefits, and recommended course of action and/or key open questions\nQualifications:\n\nDemonstrated experience in project management, including agile practices and active collaboration with product managers and owners.\nUnderstanding of end-to-end creative development processes and best practices, a plus.. Multi-media experience is a plus.\nStrong planning, scheduling, cost management, and reporting skills required\nDemonstrated experience balancing multiple diverse projects with competing demands for scope, time, cost, and risk, with a limited pool of resources.\nExperience in creative resource management and proficient in project management tools (i.e. Smartsheet, Microsoft Office, Jira, etc.). Agency experience a plus.\nDemonstrated ability to plan and implement solutions, both end-to-end at the tactical scale, and through developing requirements for larger initiatives\nFacility with data collection, aggregation of evidence, analysis, and interpretation, including practical applications to inform business and solution decisions and recommendations\nExcellent verbal and written communications clear, compelling, and persuasive in your communications with the ability to build strong working relationships with other teams in the organization.\nAbility to work well with staff at all organizational levels, vendors/partners, and educators\nStrong, yet kind interpersonal management skills with the ability to understand, motivate, inspire trust, and build rapport with peers and leadership.\nAffinity for being a team player eager to troubleshoot challenges, share your knowledge, and learn from others\nStrongly preferred: Experience with the Advanced Placement Program, or in education or school management",
          company: "Akamai Technologies",
          city: "Cambridge",
          state: "MA",
          country: "United States",
          workLocationType: "Hybrid",
          employmentType: "Full Time",
          yearsOfExperience: 5,
          baseSalary: 150,
          skills: ["Salesforce, Java, React JS"],
          totalCompensation: 1250,
          visibleTo: "Everyone",
          jobPostStatus: 0,
          favoritedCount: 0,
          applyCount: 0,
          expireDate: "12/24/2023",
          createdAt: "2023-11-19T23:23:00.411Z",
          updatedAt: "2023-12-20T16:37:29.773Z",
          closingDate: "2024-05-17T23:23:00.411Z",
          archiveDate: "2024-06-17T16:37:29.773Z",
          viewCount: 30,
          questionnaire: [],
        },
      })
    );
  }
}

const userService = new UserService();

export default userService;
