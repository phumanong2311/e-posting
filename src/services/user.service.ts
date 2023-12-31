import { ResponseWrapper } from "../app-provider/providerType";
import { API } from "./api";

class UserService extends API {
  async getMe(): Promise<ResponseWrapper> {
    //TODO: Call to api GET /user/me
    return new Promise((resolve, reject) => {
      resolve({
        timestamp: "2023-12-20T17:04:17.53974439",
        status: 200,
        success: true,
        message: "User retrieved successfully.",
        result: {
          id: "657199daf5cc1d1a58e00579",
          email: "test@eposting.com",
          signupDate: "2023-12-07T10:09:30.360+00:00",
          isEmailAuthenticated: true,
          accountType: 1,
          accountStatus: "active",
          role: "ROLE_USER",
          accountSettings: null,
          lastActive: null,
          provider: "local",
          profile: null,
          favorites: [],
          following: [],
        },
      });
    });
  }

  //TODO: Call to api GET /user/profile
  async getProfile(): Promise<ResponseWrapper> {
    return new Promise((resolve, reject) => {
      resolve({
        timestamp: "2023-12-20T00:24:41.3925923",
        status: 200,
        success: true,
        message: "Profile retrieved successfully",
        result: {
          id: "657199daf5cc1d1a58e00579",
          profilePicture: null,
          firstName: "John",
          lastName: "Doe",
          title: "Cloud Database Manager",
          phone: "111-222-3568",
          country: "United States",
          stateOrProvince: "CA",
          city: "San Francisco",
          userSummary:
            "Managing database resiliency and managing flow of incoming and outgoing data",
          userUrls: [
            {
              urlName: "linkedin",
              url: "linkedin.com/username123",
            },
            {
              urlName: "github",
              url: "github.com/repo1",
            },
          ],
          workExperience: [
            {
              experienceId: "6582acf88b21c82b9c8ece9c",
              jobTitle: "Cloud Database Manager",
              employmentType: "Part Time",
              company: "ePosting",
              workLocationType: "Remote",
              isCurrentlyActive: true,
              location: "USA",
              startDate: "2020-12-20T04:21:56.040+00:00",
              endDate: null,
              responsibilities: "Managing Cloud Database",
            },
          ],
          skills: [],
          resume: null,
          profileStep1: "complete",
          profileStep2: "complete",
          profileStep3: "current",
          profileStep4: "incomplete",
        },
      });
    });
  }
}

const userService = new UserService();

export default userService;
