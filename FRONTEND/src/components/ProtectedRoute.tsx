// src/components/ProtectedRoute.tsx
import { useAppSelector } from "../store/hooks";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../store/store";
import Spinner from "./UI/LoadingSVG";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAppSelector((state: RootState) => state.auth);

  // While loading, render nothing or a loading indicator
  if (loading) {
    return <Spinner/>
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the nested routes or component
  return <Outlet />;
};

export default ProtectedRoute;