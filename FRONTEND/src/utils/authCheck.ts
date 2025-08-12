// hooks/useAuthCheck.ts
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../api/user.api";
import { getMe } from "../store/features/authSlice";
import type { RootState } from "../store/store";

export const useAuthCheck = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const checkAuth = async () => {
    try {
      const res = await getCurrentUser();
      if (res?.data?.user) {
        dispatch(getMe(res.data.user)); // pass user to Redux
        return true;
      }
      return false;
    } catch (error) {
      navigate("/");
      return false;
    }
  };

  return { checkAuth, isAuthenticated };
};
