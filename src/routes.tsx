import { LoadingOverlay } from "@mantine/core";
import { Suspense, lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";

import { PageLayout } from "./layout";
import { CountryPage, ErrorBoundary, HomePage, NotFoundPage } from "./pages";
import { paths } from "./types";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const MyProfile = lazy(() => import("./components/MyProfile/MyProfile"));

const MyJobPostingsPage = lazy(
  () => import("./components/MyJobPosting/MyJobPostings")
);
const MyJobPostingsDetailPage = lazy(
  () => import("./components/MyJobPosting/MyJobPostingDetailPage")
);
const MyJobRequestsPage = lazy(
  () => import("./components/MyJobRequest/MyJobRequests")
);
const MyJobRequestDetailPage = lazy(
  () => import("./components/MyJobRequest/MyJobRequestDetailPage")
);
const MyJobRequestEditPage = lazy(
  () => import("./components/MyJobRequest/MyJobRequestEditPage")
);

const JobPosting = lazy(() => import("./components/JobSearch/JobPosting"));
const EditJobPosting = lazy(
  () => import("./components/JobSearch/EditJobPosting")
);

const SearchPage = lazy(() => import("./pages/SearchPage"));

const CreateCompanyPage = lazy(
  () => import("./components/CompanySearch/CreateCompanyPage")
);
const CompanyDetailPage = lazy(
  () => import("./components/CompanySearch/CompanyDetailPage")
);
const EditCompanyPage = lazy(
  () => import("./components/CompanySearch/EditCompanyPage")
);

const UserDetailPage = lazy(
  () => import("./components/UserSearch/UserDetailPage")
);
const EditUserPage = lazy(() => import("./components/UserSearch/EditUserPage"));

const RequestDetailPage = lazy(
  () => import("./components/RequestSearch/RequestDetailPage")
);
const EditRequestPage = lazy(
  () => import("./components/RequestSearch/EditRequestPage")
);

const ContentManagementPage = lazy(
  () => import("./pages/ContentManagementPage")
);
const ListContentActivePage = lazy(
  () => import("./components/ContentManagement/ListContentActive")
);
const ListContentInActivePage = lazy(
  () => import("./components/ContentManagement/ListContentInActive")
);
const CreateContentPage = lazy(
  () => import("./components/ContentManagement/CreateContentPage")
);
const EditContentPage = lazy(
  () => import("./components/ContentManagement/EditContentPage")
);
const ContentDetailPage = lazy(
  () => import("./components/ContentManagement/ContentDetailPage")
);

const ReportingPage = lazy(() => import("./pages/ReportingPage"));

const JobsReportPage = lazy(() => import("./components/Report/JobsReport"));
const JobsByDayPage = lazy(() => import("./components/Report/JobsByDay"));
const TopJobPostersPage = lazy(
  () => import("./components/Report/TopJobPosters")
);

const UsersPage = lazy(() => import("./components/Report/Users"));
const NotificationsPage = lazy(
  () => import("./components/Report/Notifications")
);
const UserAccountsCreatedByDayPage = lazy(
  () => import("./components/Report/UserAccountsCreatedByDay")
);
const RequestsPage = lazy(() => import("./components/Report/Requests"));
const RequestsByDayPage = lazy(
  () => import("./components/Report/RequestsByDay")
);
const TopRequestPostersPage = lazy(
  () => import("./components/Report/TopRequestPosters")
);
const TopCompaniesByRequestPostsPage = lazy(
  () => import("./components/Report/TopCompaniesByRequestPosts")
);
const TopCompaniesByJobPostsPage = lazy(
  () => import("./components/Report/TopCompaniesByJobPosts")
);
const UserAccountsByCreationMethodPage = lazy(
  () => import("./components/Report/UserAccountsByCreationMethod")
);
const UserAccountsByMonthPage = lazy(
  () => import("./components/Report/UserAccountsByMonth")
);
const NotificationsByDayPage = lazy(
  () => import("./components/Report/NotificationsByDay")
);

const SkillPage = lazy(() => import("./pages/SkillPage"));
const CreateSkillPage = lazy(
  () => import("./components/Skills/CreateSkillPage")
);
const SkillDetailPage = lazy(
  () => import("./components/Skills/SkillDetailPage")
);
const EditSkillPage = lazy(() => import("./components/Skills/EditSkillPage"));

const CreateCountryPage = lazy(
  () => import("./components/Country/CreateCountryPage")
);
const EditCountryPage = lazy(
  () => import("./components/Country/EditCountryPage")
);

const routesConfig: RouteObject[] = [
  {
    path: paths.ROOT,
    element: (
      <Suspense fallback={<LoadingOverlay visible variant="dots" />}>
        <PageLayout />
      </Suspense>
    ),
    children: [
      {
        path: paths.DASHBOARD,
        element: <HomePage />,
        children: [
          {
            path: paths.PROFILE,
            index: true,
            element: (
              <Suspense>
                <MyProfile />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.MY_JOB_POSTING,
            element: (
              <Suspense>
                <MyJobPostingsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: `${paths.MY_JOB_POSTING}/:id`,
            element: (
              <Suspense>
                <MyJobPostingsDetailPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.MY_JOB_REQUEST,
            element: (
              <Suspense>
                <MyJobRequestsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: `${paths.MY_JOB_REQUEST}/:id`,
            element: (
              <Suspense>
                <MyJobRequestDetailPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: `${paths.MY_JOB_REQUEST_EDIT}/:id`,
            element: (
              <Suspense fallback={<p>Loading package location...</p>}>
                <MyJobRequestEditPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: `${paths.JOB_POSTING}/:id`,
            element: (
              <Suspense>
                <JobPosting />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: `${paths.EDIT_JOB_POSTING}/:id`,
            element: (
              <Suspense fallback={<p>Loading package location...</p>}>
                <EditJobPosting />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: `${paths.REQUEST_DETAIL}/:id`,
            element: (
              <Suspense>
                <RequestDetailPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: `${paths.EDIT_REQUEST}/:id`,
            element: (
              <Suspense>
                <EditRequestPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
        ],
      },
      {
        path: paths.SEARCH,
        element: (
          <Suspense>
            <SearchPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },

      {
        path: paths.SKILLS,
        element: (
          <Suspense>
            <SkillPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },

      {
        path: paths.SKILLS_CREATE,
        element: (
          <Suspense>
            <CreateSkillPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: `${paths.SKILLS_DETAIL}/:id`,
        element: (
          <Suspense>
            <SkillDetailPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },

      {
        path: `${paths.SKILLS_EDIT}/:id`,
        element: (
          <Suspense>
            <EditSkillPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },

      // Country Management Section
      {
        path: paths.COUNTRY,
        element: (
          <Suspense>
            <CountryPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: paths.COUNTRY_CREATE,
        element: (
          <Suspense>
            <CreateCountryPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },

      {
        path: `${paths.COUNTRY_EDIT}/:id`,
        element: (
          <Suspense>
            <EditCountryPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },

      {
        path: paths.REPORTING,
        element: (
          <Suspense>
            <ReportingPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: paths.REPORT_JOBS,
            index: true,
            element: (
              <Suspense>
                <JobsReportPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_REQUESTS,
            element: (
              <Suspense>
                <RequestsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_USERS,
            element: (
              <Suspense>
                <UsersPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_NOTIFICATIONS,
            element: (
              <Suspense>
                <NotificationsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_JOBS_BY_DAY,
            index: true,
            element: (
              <Suspense>
                <JobsByDayPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_JOBS_TOP_POSTERS,
            element: (
              <Suspense>
                <TopJobPostersPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_JOBS_TOP_COMPANIES,
            element: (
              <Suspense>
                <TopCompaniesByJobPostsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_REQUESTS_TOP_POSTERS,
            element: (
              <Suspense>
                <TopRequestPostersPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_REQUESTS_BY_DAY,
            index: true,
            element: (
              <Suspense>
                <RequestsByDayPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_REQUESTS_TOP_COMPANIES,
            element: (
              <Suspense>
                <TopCompaniesByRequestPostsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_USERS_BY_DAY,
            index: true,
            element: (
              <Suspense>
                <UserAccountsCreatedByDayPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_USERS_TOTAL,
            index: true,
            element: (
              <Suspense>
                <UserAccountsByCreationMethodPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_USERS_BY_MONTH,
            index: true,
            element: (
              <Suspense>
                <UserAccountsByMonthPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.REPORT_NOTIFICATIONS_BY_DAY,
            index: true,
            element: (
              <Suspense>
                <NotificationsByDayPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
        ],
      },
      {
        path: paths.CREATE_COMPANY,
        element: (
          <Suspense>
            <CreateCompanyPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: `${paths.COMPANY_DETAIL}/:id`,
        element: (
          <Suspense>
            <CompanyDetailPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: `${paths.EDIT_COMPANY}/:id`,
        element: (
          <Suspense>
            <EditCompanyPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: `${paths.USER_DETAIL}/:id`,
        element: (
          <Suspense>
            <UserDetailPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: `${paths.EDIT_USER}/:id`,
        element: (
          <Suspense>
            <EditUserPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
      },
      {
        path: paths.CONTENT_MANAGEMENT,
        element: (
          <Suspense>
            <ContentManagementPage />
          </Suspense>
        ),
        children: [
          {
            path: paths.LIST_OF_ACTIVE_CONTENTS,
            index: true,
            element: (
              <Suspense>
                <ListContentActivePage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.LIST_OF_INACTIVE_CONTENTS,
            element: (
              <Suspense>
                <ListContentInActivePage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: paths.CREATE_CONTENT,
            element: (
              <Suspense>
                <CreateContentPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: `${paths.EDIT_CONTENT}/:id`,
            element: (
              <Suspense>
                <EditContentPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: `${paths.CONTENT_DETAIL}/:id`,
            element: (
              <Suspense>
                <ContentDetailPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
        ],
      },
    ],
  },
  {
    path: paths.LOGIN,
    index: true,
    element: (
      <Suspense>
        <LoginPage />
      </Suspense>
    ),
    errorElement: <ErrorBoundary />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(routesConfig);
