import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for dark mode preference on initial load
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
          <MoonIcon className="w-4 h-4 text-primary" />
        ) : (
          <SunIcon className="w-4 h-4 text-primary" />
        )}
      </div>
    </button>
  );
};

// SVG Icons for better scaling and styling
const SunIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"
    />
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

export default ThemeToggle;