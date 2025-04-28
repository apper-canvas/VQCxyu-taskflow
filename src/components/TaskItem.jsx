import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "../store/taskSlice";
import { format } from "date-fns";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  const handleToggleComplete = async () => {
    try {
      await dispatch(updateTask({
        id: task.Id,
        data: { completed: !task.completed }
      })).unwrap();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this task?")) {
      try {
        await dispatch(deleteTask(task.Id)).unwrap();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return dateString;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="card p-4"
    >
      <div className="flex items-start gap-3">
        <div className="pt-1">
          <button
            onClick={handleToggleComplete}
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
                Due: {formatDate(task.dueDate)}
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
          onClick={handleDelete}
          className="text-surface-400 hover:text-red-500 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};

export default TaskItem;