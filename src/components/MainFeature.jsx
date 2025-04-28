import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Calendar, Flag } from "lucide-react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";

const MainFeature = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium",
    completed: false
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (formData.dueDate && new Date(formData.dueDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.dueDate = "Due date cannot be in the past";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      await dispatch(addTask(formData)).unwrap();
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        priority: "medium",
        completed: false
      });
      
      // Close form
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <div className="card overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b border-surface-200 dark:border-surface-700">
        <h2 className="text-xl font-semibold">Create New Task</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsFormOpen(!isFormOpen)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            isFormOpen 
              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400" 
              : "bg-primary/10 text-primary dark:bg-primary/20"
          }`}
        >
          {isFormOpen ? <X size={18} /> : <Plus size={18} />}
        </motion.button>
      </div>
      
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`input ${errors.title ? "border-red-500 focus:ring-red-500" : ""}`}
                  placeholder="What needs to be done?"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="input"
                  placeholder="Add details about this task..."
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium mb-1">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>Due Date</span>
                    </div>
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className={`input ${errors.dueDate ? "border-red-500 focus:ring-red-500" : ""}`}
                  />
                  {errors.dueDate && (
                    <p className="mt-1 text-sm text-red-500">{errors.dueDate}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium mb-1">
                    <div className="flex items-center gap-1">
                      <Flag size={16} />
                      <span>Priority</span>
                    </div>
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="btn btn-primary"
                >
                  Add Task
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      {!isFormOpen && (
        <div className="p-6 text-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setIsFormOpen(true)}
            className="btn btn-primary inline-flex items-center gap-2"
          >
            <Plus size={18} />
            <span>Add New Task</span>
          </motion.button>
          <p className="mt-3 text-sm text-surface-500 dark:text-surface-400">
            Click to create a new task with details and priority
          </p>
        </div>
      )}
    </div>
  );
};

export default MainFeature;