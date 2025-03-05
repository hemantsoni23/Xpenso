import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaRegSun, FaRegMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    document.documentElement.classList.toggle("dark");
    toast.success(newDarkMode ? "Dark Mode Activated 🌙" : "Light Mode Activated 🌞");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      aria-pressed={isDark}
      className={`
        relative w-14 h-8 rounded-full transition-colors duration-300
        bg-muted hover:bg-muted-hover focus:outline-none focus:ring-2
        focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
      `}
    >
      {/* Thumb with icon */}
      <div
        className={`
          absolute top-1 left-1 w-6 h-6 rounded-full bg-background
          shadow-sm flex items-center justify-center transition-transform
          duration-300 transform ${isDark ? "translate-x-6" : "translate-x-0"}
        `}
      >
        {isDark ? (
          <FaRegMoon className="w-4 h-4 text-primary" />
        ) : (
          <FaRegSun className="w-4 h-4 text-primary" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle;