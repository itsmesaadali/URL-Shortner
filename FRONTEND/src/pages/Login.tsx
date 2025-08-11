import LoginForm from "../components/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/user.api";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from '../store/store'; 
import { login } from "../store/features/authSlice";

export default function Login() {
  const navigate = useNavigate();

  const auth = useSelector((state:RootState) => state.auth)
  console.log(auth)
  const dispatch = useDispatch()
  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await loginUser(email, password);
      dispatch(login(res.data))


    toast.success(`Welcome back, ${res.data.user.name}!`);
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
