import { Suspense, lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const MyProfilePage = lazy(() => import("./pages/MyProfile"));
const MyJobPostingsPage = lazy(() => import("./pages/MyJobPostings"));
const MyJobRequestsPage = lazy(() => import("./pages/MyJobRequests"));
const MyJobPostingsDetailPage = lazy(
  () => import("./pages/MyJobPostingDetailPage")
);
const SearchPage = lazy(() => import("./pages/SearchPage"));

const routesConfig = {
  path: "/",
  name: "home",
  element: <LoginPage />,
  children: [
    {
      path: "/login",
      element: (
        <Suspense>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
      children: [
        {
          path: "profile",
          element: (
            <Suspense>
              <MyProfilePage />
            </Suspense>
          ),
        },
        {
          path: "job-postings",
          element: (
            <Suspense>
              <MyJobPostingsPage />
            </Suspense>
          ),
        },
        {
          path: "job-requests",
          element: (
            <Suspense>
              <MyJobRequestsPage />
            </Suspense>
          ),
        },
        {
          path: "job-postings/detail",
          element: (
            <Suspense>
              <MyJobPostingsDetailPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/search",
      element: (
        <Suspense>
          <SearchPage />
        </Suspense>
      ),
    },
  ],
};

export const router = createBrowserRouter([routesConfig as RouteObject], {
  basename: "/",
});
