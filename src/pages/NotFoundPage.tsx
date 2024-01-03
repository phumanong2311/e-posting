import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl mb-2">404</h1>
      <h2 className="text-2xl mb-4">Page not found!</h2>
      <p className="mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
      <Link to="/" className="text-white bg-blue-500 border-blue-500 py-1 px-2 no-underline">Go To Homepage</Link>
    </div>
  );
};

export default NotFoundPage;