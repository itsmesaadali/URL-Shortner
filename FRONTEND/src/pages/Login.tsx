import LoginForm from "../components/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/user.api";
import toast from "react-hot-toast";
import { useAppDispatch } from "../store/hooks";
import { login } from "../store/features/authSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await loginUser(email, password);
      dispatch(login(res.data.user))
      toast.success(res.message);
    navigate("/");
  } catch (error: any) {
      
    toast.error(error.response?.data?.message || error.message);
  }
};


  return (
    <section className="flex justify-center items-center min-h-screen px-4">
      <div className="card w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <LoginForm onSubmit={handleLogin} />

        <p className="text-sm text-[var(--muted)] mt-4 text-center">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-[var(--primary)] hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}
