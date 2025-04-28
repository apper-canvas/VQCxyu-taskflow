import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainFeature from "../components/MainFeature";

const Home = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [activeList, setActiveList] = useState("all");
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    highPriority: 0
  });
  
  // Update stats whenever tasks change
  useEffect(() => {
    const completed = tasks.filter(task => task.completed).length;
    const highPriority = tasks.filter(task => task.priority === "high" && !task.completed).length;
    
    setStats({
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
      highPriority
    });
    
    // Save to localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };
  
  const getFilteredTasks = () => {
    switch (activeList) {
      case "completed":
        return tasks.filter(task => task.completed);
      case "pending":
        return tasks.filter(task => !task.completed);
      case "high":
        return tasks.filter(task => task.priority === "high");
      case "medium":
        return tasks.filter(task => task.priority === "medium");
      case "low":
        return tasks.filter(task => task.priority === "low");
      default:
        return tasks;
    }
  };
  
  const filteredTasks = getFilteredTasks();
  
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Welcome to TaskFlow
        </h1>
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          Organize your tasks, boost your productivity
        </p>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar */}
        <motion.div 
          className="md:col-span-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="card p-4 mb-6">
            <h2 className="text-lg font-semibold mb-3">Dashboard</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-surface-600 dark:text-surface-400">Total Tasks</span>
                <span className="font-semibold">{stats.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-600 dark:text-surface-400">Completed</span>
                <span className="font-semibold text-green-500">{stats.completed}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-600 dark:text-surface-400">Pending</span>
                <span className="font-semibold text-amber-500">{stats.pending}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-surface-600 dark:text-surface-400">High Priority</span>
                <span className="font-semibold text-red-500">{stats.highPriority}</span>
              </div>
            </div>
          </div>
          
          <div className="card p-4">
            <h2 className="text-lg font-semibold mb-3">Lists</h2>
            <nav className="space-y-1">
              {[
                { id: "all", name: "All Tasks" },
                { id: "pending", name: "Pending" },
                { id: "completed", name: "Completed" },
                { id: "high", name: "High Priority" },
                { id: "medium", name: "Medium Priority" },
                { id: "low", name: "Low Priority" }
              ].map(list => (
                <button
                  key={list.id}
                  onClick={() => setActiveList(list.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeList === list.id
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "hover:bg-surface-100 dark:hover:bg-surface-700"
                  }`}
                >
                  {list.name}
                </button>
              ))}
            </nav>
          </div>
        </motion.div>
        
        {/* Main content */}
        <motion.div 
          className="md:col-span-9"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <MainFeature onAddTask={addTask} />
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">
              {activeList === "all" ? "All Tasks" : 
               activeList === "completed" ? "Completed Tasks" :
               activeList === "pending" ? "Pending Tasks" :
               activeList === "high" ? "High Priority Tasks" :
               activeList === "medium" ? "Medium Priority Tasks" :
               "Low Priority Tasks"}
            </h2>
            
            {filteredTasks.length === 0 ? (
              <div className="card p-8 text-center">
                <p className="text-surface-500 dark:text-surface-400">No tasks found in this list.</p>
              </div>
            ) : (
              <div className="space-y-3">
                <AnimatePresence>
                  {filteredTasks.map(task => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="card p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="pt-1">
                          <button
                            onClick={() => toggleTaskCompletion(task.id)}
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                              task.completed
                                ? "bg-primary border-primary"
                                : "border-surface-300 dark:border-surface-600"
                            }`}
                          >
                            {task.completed && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </button>
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-medium ${task.completed ? "line-through text-surface-400" : ""}`}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className={`mt-1 text-sm ${task.completed ? "text-surface-400" : "text-surface-600 dark:text-surface-400"}`}>
                              {task.description}
                            </p>
                          )}
                          <div className="mt-2 flex items-center gap-3 text-xs">
                            {task.dueDate && (
                              <span className="px-2 py-1 rounded-full bg-surface-100 dark:bg-surface-700">
                                Due: {task.dueDate}
                              </span>
                            )}
                            <span className={`px-2 py-1 rounded-full ${
                              task.priority === "high" 
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" 
                                : task.priority === "medium"
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            }`}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="text-surface-400 hover:text-red-500 transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;