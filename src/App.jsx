import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="text-primary text-2xl font-bold"
            >
              TaskFlow
            </motion.div>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.button>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-20 pb-10 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-surface-100 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700 py-4">
        <div className="container mx-auto px-4 text-center text-surface-500 dark:text-surface-400 text-sm">
          &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default App;