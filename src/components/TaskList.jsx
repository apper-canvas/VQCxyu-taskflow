import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../store/taskSlice";
import { AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";

const TaskList = () => {
  const [activeList, setActiveList] = useState("all");
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    highPriority: 0
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks) {
      const completed = tasks.filter(task => task.completed).length;
      const highPriority = tasks.filter(task => task.priority === "high" && !task.completed).length;
      
      setStats({
        total: tasks.length,
        completed,
        pending: tasks.length - completed,
        highPriority
      });
    }
  }, [tasks]);

  const getFilteredTasks = () => {
    if (!tasks) return [];
    
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

  if (loading) {
    return (
      <div className="mt-8">
        <div className="card p-8 text-center">
          <p className="text-surface-500 dark:text-surface-400">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <div className="card p-8 text-center">
          <p className="text-red-500">Error loading tasks. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Sidebar */}
      <div className="md:col-span-3">
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
      </div>
        
      {/* Main content */}
      <div className="md:col-span-9">
        <div>
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
                  <TaskItem key={task.Id} task={task} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;