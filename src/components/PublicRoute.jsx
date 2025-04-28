import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading, error } = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="card p-8 rounded-lg shadow-lg bg-white dark:bg-surface-800 flex flex-col items-center">
          <div className="w-10 h-10 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-center text-surface-700 dark:text-surface-300">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="card p-8 rounded-lg shadow-lg bg-white dark:bg-surface-800">
          <p className="text-center text-red-500 mb-4">Authentication Error: {error}</p>
          <div className="flex justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PublicRoute;