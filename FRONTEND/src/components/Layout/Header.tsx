import { useEffect, useState } from "react";
import { Home, Sun, Moon } from "lucide-react";
import { useAppDispatch } from "../../store/hooks";
import { fetchCurrentUser } from "../../store/features/authSlice"; // Import thunks 
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
const navigate = useNavigate();
const dispatch = useAppDispatch()
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

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  // Dark mode toggle
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("dark-mode", newMode.toString());
  };

  // Logout handler
 const handleLogout = async () => {
  
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
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/custom-url")}
                className="hover:text-blue-400 transition"
              >
                Custom URL
              </button>
              <button
                onClick={handleLogout}
                className="hover:text-red-500 transition"
              >
                Logout
              </button>
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
