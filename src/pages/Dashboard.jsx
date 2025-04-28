import { useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import MainFeature from "../components/MainFeature";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome{user ? `, ${user.firstName || 'back'}` : ''}
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          Organize your tasks, boost your productivity
        </p>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <MainFeature />
      </motion.div>
      
      <TaskList />
    </div>
  );
};

export default Dashboard;