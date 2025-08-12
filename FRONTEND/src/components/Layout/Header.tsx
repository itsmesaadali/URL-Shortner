// src/components/Header.tsx
import { useEffect, useState } from "react";
import { Home, Sun, Moon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import type { RootState } from "../../store/store";
import LogoutButton from "../LogoutButton";
import Spinner from "../UI/LoadingSVG";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAppSelector((state: RootState) => state.auth);

  // Load saved dark mode or system preference on mount
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

  // Dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("dark-mode", newMode.toString());
  };

  // Render nothing or a loading state while auth is being checked
  if (loading) {
    return <Spinner/>
  }

  return (
    <header className="bg-gray-900 text-[var(--text-inverse)] shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/">
        <div className="flex items-center gap-2">
          <Home className="h-6 w-6 text-[var(--text-inverse)]" />
          <span className="font-bold text-lg select-none">URL Shortener</span>
        </div>
        </Link>
        

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/custom-url")}
                className="hover:text-blue-400 transition"
              >
                Custom URL
              </button>
              <LogoutButton />
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hover:text-blue-400 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="hover:text-blue-400 transition"
              >
                Register
              </button>
            </>
          )}

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