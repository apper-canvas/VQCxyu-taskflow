import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser, setError, setLoading } from "../store/userSlice";
import { setupAuthUI, cleanupAuthUI } from "../services/authService";
import AuthLayout from "../components/AuthLayout";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authContainerRef = useRef(null);
  const [authError, setAuthError] = useState(null);
  const [isSettingUp, setIsSettingUp] = useState(true);

  useEffect(() => {
    const setupAuth = async () => {
      setIsSettingUp(true);
      
      try {
        dispatch(setLoading(true));
        
        await setupAuthUI(
          '#authentication', 
          'signup',
          (user) => {
            dispatch(setUser(user));
            navigate('/dashboard');
          },
          (error) => {
            console.error("Authentication failed:", error);
            setAuthError("Registration failed. Please try again.");
            dispatch(setError("Authentication failed"));
          }
        );
      } catch (error) {
        console.error("Error setting up authentication:", error);
        setAuthError("Could not initialize signup. Please reload the page.");
        dispatch(setError("SDK initialization failed"));
      } finally {
        setIsSettingUp(false);
      }
    };

    if (authContainerRef.current) {
      setupAuth();
    }

    return () => {
      cleanupAuthUI();
    };
  }, [navigate, dispatch]);

  return (
    <AuthLayout 
      title="Create Account"
      subtitle="Join TaskFlow to boost your productivity"
    >
      {isSettingUp ? (
        <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
          <div className="w-8 h-8 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <p className="text-surface-600 dark:text-surface-400">Initializing signup...</p>
        </div>
      ) : (
        <>
          {authError ? (
            <div className="min-h-[400px] flex flex-col items-center justify-center">
              <div className="text-red-500 mb-4">{authError}</div>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Reload Page
              </button>
            </div>
          ) : (
            <div 
              id="authentication" 
              ref={authContainerRef}
              className="min-h-[400px] flex items-center justify-center" 
            />
          )}
        </>
      )}
      
      <div className="text-center mt-6">
        <p className="text-surface-600 dark:text-surface-400 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-primary hover:underline">
            Log in
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Signup;