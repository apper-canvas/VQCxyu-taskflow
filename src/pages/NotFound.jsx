import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home as HomeIcon } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md"
      >
        <div className="mb-8">
          <div className="text-9xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </div>
          <h1 className="text-2xl font-bold mt-4 mb-2">Page Not Found</h1>
          <p className="text-surface-600 dark:text-surface-400">
            The page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <HomeIcon size={18} />
            <span>Back to Home</span>
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;