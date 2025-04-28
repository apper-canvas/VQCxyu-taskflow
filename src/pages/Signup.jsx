import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import AuthLayout from "../components/AuthLayout";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authContainerRef = useRef(null);

  useEffect(() => {
    const setupAuth = () => {
      try {
        const { ApperClient, ApperUI } = window.ApperSDK;
        const apperClient = new ApperClient("b136133272e94b3a99a5a910862af5b7");
        
        ApperUI.setup(apperClient, {
          target: '#authentication',
          clientId: "b136133272e94b3a99a5a910862af5b7",
          hide: [],
          view: 'signup',
          onSuccess: function(user) {
            dispatch(setUser(user));
            navigate('/dashboard');
          },
          onError: function(error) {
            console.error("Authentication failed:", error);
          }
        });
        
        ApperUI.showLogin("#authentication");
      } catch (error) {
        console.error("Error setting up authentication:", error);
      }
    };

    if (authContainerRef.current) {
      // Small delay to ensure the DOM is ready
      setTimeout(setupAuth, 100);
    }

    return () => {
      try {
        const { ApperUI } = window.ApperSDK;
        ApperUI.logout();
      } catch (error) {
        // Ignore errors during cleanup
      }
    };
  }, [navigate, dispatch]);

  return (
    <AuthLayout 
      title="Create Account"
      subtitle="Join TaskFlow to boost your productivity"
    >
      <div 
        id="authentication" 
        ref={authContainerRef}
        className="min-h-[400px] flex items-center justify-center" 
      />
      
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