import { ErrorResponse, Link, useRouteError } from "react-router-dom";
import { paths } from "../types";

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="grid items-center justify-center w-full h-full bg-center bg-no-repeat bg-cover bg-not-found-error">
      <div className="px-4 py-2 space-y-8 bg-transparent">
        <div className="space-y-8">
          <div className="flex flex-wrap space-x-4">
            {/* {(error as ErrorResponse) && (
              <div className="text-6xl">
                {(error as ErrorResponse).status} -
                {(error as ErrorResponse).statusText}
              </div>
            )} */}
            <div className="text-6xl">Something Went Wrong.</div>
          </div>
          {(error as ErrorResponse) && (
            <div className="text-3xl">
              {/* {(error as ErrorResponse).data}, */}
              Please click the button to
              comeback to Home Page
            </div>
          )}
        </div>
        <div>
          <Link
            to={`/${paths.ROOT}/${paths.DASHBOARD}/${paths.PROFILE}`}
            className="text-white bg-blue-500 border-blue-500 py-1 px-2 no-underline"
          >
            Go To Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ErrorBoundary;
