import { useEffect, useState } from "react";
import { Home, User, Sun, Moon } from "lucide-react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);

// Load saved mode or system preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("dark-mode");
    if (saved !== null) {
      setDarkMode(saved === "true");
      document.documentElement.classList.toggle("dark", saved === "true");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("dark-mode", newMode.toString());
  };

  return (
    <header className="bg-gray-900 text-[var(--text-inverse)] shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6 text-[var(--text-inverse)]" />
          <span className="font-bold text-lg select-none">MyApp</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          
          <button className="flex items-center gap-1 hover:text-blue-400 transition">
            <User className="h-5 w-5 text-[var(--text-inverse)]" /> Profile
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="p-2 rounded hover:bg-gray-700 transition"
          >
            {darkMode ? (
              <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
              <Moon className="h-6 w-6 text-gray-300" />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}



