// src/components/LogoutButton.tsx
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error || "Logout failed");
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;