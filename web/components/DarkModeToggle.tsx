import { useState, useEffect } from "react";

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage on first render
  useEffect(() => {
    const storedMode = localStorage.getItem("theme");
    if (storedMode === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode and store the preference
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      className="fixed w-36 text-xl top-8 right-8 px-4 py-2 bg-gray-800 text-white dark:bg-gray-200 dark:text-black border-4 border-white dark:border-gray-500 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
