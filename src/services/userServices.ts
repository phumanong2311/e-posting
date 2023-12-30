export const userServices = () => {
  return {
    async getMe() {
      //todo get user me
      return {
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
      };
    },
  };
};
