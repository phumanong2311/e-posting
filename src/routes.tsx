import { Suspense, lazy } from "react";
import { RouteObject, createBrowserRouter } from "react-router-dom";
import { AuthenticatedRoute } from "./app-provider/AuthenticatedRoute";
import { PageLayout } from "./layout/layout";
import { DashboardLayout } from "./layout/layout/DashboardLayout";
import { DefaultPage, NotFoundPage } from "./pages";

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
  name: "root",
  element: <DefaultPage />,
  children: [
    {
      path: "/",
      name: "after-login",
      element: (
        <AuthenticatedRoute>
          <PageLayout />
        </AuthenticatedRoute>
      ),
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          element: <DashboardLayout />,
          children: [
            {
              path: "profile",
              name: "profile",
              element: (
                <Suspense>
                  <MyProfilePage />
                </Suspense>
              ),
            },
            {
              path: "job-postings",
              name: "job-postings",
              element: (
                <Suspense>
                  <MyJobPostingsPage />
                </Suspense>
              ),
            },
            {
              path: "job-postings/:id",
              name: "job-postings-detail",
              element: (
                <Suspense>
                  <MyJobPostingsDetailPage />
                </Suspense>
              ),
            },
            {
              path: "job-requests",
              name: "job-requests",
              element: (
                <Suspense>
                  <MyJobRequestsPage />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: "search",
          name: "search",
          element: (
            <Suspense>
              <SearchPage />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "login",
      name: "login",
      element: (
        <Suspense>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
};

export const router = createBrowserRouter([routesConfig as RouteObject], {
  basename: "/",
});
