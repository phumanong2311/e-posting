import { LoadingOverlay } from '@mantine/core'
import { Suspense, lazy } from 'react'
import { RouteObject, createBrowserRouter } from 'react-router-dom'
import { EditJobPosting } from './components/JobPosting'
import { PageLayout } from './layout/layout'
import { DashboardLayout } from './layout/layout/DashboardLayout'
import { NotFoundPage } from './pages'
import ErrorBoundary from './pages/ErrorBoundary '
import { paths } from './types'

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
            path: paths.JOB_REQUEST,
            element: (
              <Suspense>
                <MyJobRequestsPage />
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
