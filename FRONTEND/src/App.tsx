// src/App.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchCurrentUser } from "./store/features/authSlice";
import { HomePage } from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { NotFound } from "./pages/NotFound";
import { AppLayout } from "./components/Layout/AppLayout";
import type { RootState } from "./store/store";
import ProtectedRoute from "./components/ProtectedRoute";
import Spinner from "./components/UI/LoadingSVG";
import { CustomUrl } from "./pages/CustomUrl";

function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch]);

  // Render nothing or a loading state while auth is being checked
  if (loading) {
    return <Spinner/>
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "var(--surface)",
            color: "var(--text)",
            borderRadius: "0.5rem",
            boxShadow: "0 6px 20px rgba(3,10,25,0.06)",
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/custom-url" element={<CustomUrl/>} /> {/* Placeholder */}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;