import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <div className="max-w-5xl mx-auto text-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome to TaskFlow
        </h1>
        <p className="text-xl text-surface-600 dark:text-surface-400 mb-8 max-w-2xl mx-auto">
          A modern task management app to boost your productivity and organize your life.
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
      >
        {isAuthenticated ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="btn btn-primary px-8 py-3 text-lg"
          >
            Go to Dashboard
          </motion.button>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
              className="btn btn-primary px-8 py-3 text-lg"
            >
              Sign Up
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/login")}
              className="btn btn-outline px-8 py-3 text-lg"
            >
              Login
            </motion.button>
          </>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <motion.div 
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="text-primary text-4xl mb-4">✓</div>
          <h3 className="text-xl font-semibold mb-2">Easy Task Creation</h3>
          <p className="text-surface-600 dark:text-surface-400">
            Create tasks quickly with priorities, due dates, and detailed descriptions.
          </p>
        </motion.div>
        
        <motion.div 
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="text-primary text-4xl mb-4">🔄</div>
          <h3 className="text-xl font-semibold mb-2">Cloud Sync</h3>
          <p className="text-surface-600 dark:text-surface-400">
            Your tasks are synced across all devices, so you never lose track of what needs to be done.
          </p>
        </motion.div>
        
        <motion.div 
          className="card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="text-primary text-4xl mb-4">📊</div>
          <h3 className="text-xl font-semibold mb-2">Productivity Insights</h3>
          <p className="text-surface-600 dark:text-surface-400">
            Track your productivity with intuitive dashboards and task completion metrics.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;