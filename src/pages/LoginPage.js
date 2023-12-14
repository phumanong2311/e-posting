import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                ePosting Admin Portal
              </h1>
              <label>
                <span>Email</span>
                <input
                  className="mt-1"
                  type="email"
                  placeholder="john@doe.com"
                />
              </label>

              <label className="mt-4">
                <span>Password</span>
                <input
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                />
              </label>

              <button className="mt-4" block to="/app">
                Log in
              </button>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/create-account"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
