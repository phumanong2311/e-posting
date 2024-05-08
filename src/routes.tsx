import { LoadingOverlay } from '@mantine/core'
import { Suspense, lazy } from 'react'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { EditJobPosting } from './components/JobPosting'
import { EditJobRequest } from './components/JobRequest'
import { PageLayout } from './layout/layout'
import { DashboardLayout } from './layout/layout/DashboardLayout'
import { NotFoundPage } from './pages'
import ErrorBoundary from './pages/ErrorBoundary '
import MyJobRequestDetailPage from './pages/MyJobRequestDetailPage'
import { paths } from './types'


const JobsPage = lazy(() => import("./pages/Jobs"));
const JobsByDayPage = lazy(() => import("./pages/JobsByDay"));
const TopJobPostersPage = lazy(() => import("./pages/TopJobPosters"));
const UsersPage = lazy(() => import("./pages/Users"));
const NotificationsPage = lazy(() => import("./pages/Notifications"));
const UserAccountsCreatedByDayPage = lazy(() => import("./pages/UserAccountsCreatedByDay"));
const RequestsPage = lazy(() => import("./pages/Requests"));
const RequestsByDayPage = lazy(() => import("./pages/RequestsByDay"));
const TopRequestPostersPage = lazy(() => import("./pages/TopRequestPosters"));
const TopCompaniesByRequestPostsPage = lazy(() => import("./pages/TopCompaniesByRequestPosts"));
const TopCompaniesByJobPostsPage = lazy(() => import("./pages/TopCompaniesByJobPosts"));
const UserAccountsByCreationMethodPage = lazy(() => import("./pages/UserAccountsByCreationMethod"));
const UserAccountsByMonthPage = lazy(() => import("./pages/UserAccountsByMonth"));
const NotificationsByDayPage = lazy(() => import("./pages/NotificationsByDay"));
const ReportingPage = lazy(() => import("./pages/ReportingPage"));

const LoginPage = lazy(() => import('./pages/LoginPage'))
const MyProfilePage = lazy(() => import('./pages/MyProfile'))
const MyJobPostingsPage = lazy(
  () => import('./components/JobPosting/MyJobPostings')
)
const MyJobRequestsPage = lazy(() => import('./pages/MyJobRequests'))
const MyJobPostingsDetailPage = lazy(
  () => import('./pages/MyJobPostingDetailPage')
)
const JobPosting = lazy(() => import('./pages/JobPosting'))

const SearchPage = lazy(() => import('./pages/SearchPage'))
const CreateCompanyPage = lazy(
  () => import('./pages/Company/CreateCompanyPage')
)
const CompanyDetailPage = lazy(
  () => import('./pages/Company/CompanyDetailPage')
)
const EditCompanyPage = lazy(() => import('./pages/Company/EditCompanyPage'))

const UserDetailPage = lazy(() => import('./pages/User/UserDetailPage'))
const EditUserPage = lazy(() => import('./pages/User/EditUserPage'))

const RequestDetailPage = lazy(
  () => import('./pages/Request/RequestDetailPage')
)
const EditRequestPage = lazy(() => import('./pages/Request/EditRequestPage'))

const ContentManagement = lazy(() => import('./pages/ContentManagement'))
const ListContentActivePage = lazy(() => import('./components/ContentManagement/ListContentActive'))
const ListContentInActivePage = lazy(() => import('./components/ContentManagement/ListContentInActive'))
const CreateContentPage = lazy(() => import('./components/ContentManagement/CreateContentPage'))
const EditContentPage = lazy(() => import('./components/ContentManagement/EditContentPage'))
const ContentDetailPage = lazy(() => import('./components/ContentManagement/ContentDetailPage'))

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
        element: <DashboardLayout />,
        children: [
          {
            path: paths.PROFILE,
            index: true,
            element: (
              <Suspense>
                <MyProfilePage />
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
            path: `${paths.EDIT_JOB_REQUEST}/:id`,
            element: (
              <Suspense fallback={<p>Loading package location...</p>}>
                <EditJobRequest />
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
        path: "reporting",
        element: (
          <Suspense>
            <ReportingPage />
          </Suspense>
        ),
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: "jobs",
            index: true,
            element: (
              <Suspense>
                <JobsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "requests",
            element: (
              <Suspense>
                <RequestsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "users",
            element: (
              <Suspense>
                <UsersPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "notifications",
            element: (
              <Suspense>
                <NotificationsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "jobs/by-day",
            index: true,
            element: (
              <Suspense>
                <JobsByDayPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "jobs/top-posters",
            element: (
              <Suspense>
                <TopJobPostersPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "jobs/top-companies",
            element: (
              <Suspense>
                <TopCompaniesByJobPostsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "requests/top-posters",
            element: (
              <Suspense>
                <TopRequestPostersPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "requests/by-day",
            index: true,
            element: (
              <Suspense>
                <RequestsByDayPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "requests/top-companies",
            element: (
              <Suspense>
                <TopCompaniesByRequestPostsPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "users/by-day",
            index: true,
            element: (
              <Suspense>
                <UserAccountsCreatedByDayPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "users/total",
            index: true,
            element: (
              <Suspense>
                <UserAccountsByCreationMethodPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "users/by-month",
            index: true,
            element: (
              <Suspense>
                <UserAccountsByMonthPage />
              </Suspense>
            ),
            errorElement: <ErrorBoundary />,
          },
          {
            path: "notifications/by-day",
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
            <ContentManagement />
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
    path: '*',
    element: <NotFoundPage />,
  },
]

export const router = createBrowserRouter(routesConfig)
