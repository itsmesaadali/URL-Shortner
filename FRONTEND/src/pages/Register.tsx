import RegisterForm from "../components/RegisterForm";
import {Link, useNavigate } from 'react-router-dom'
import { registerUser } from "../api/user.api";
import toast from "react-hot-toast";
import { useAppDispatch } from "../store/hooks";
import { register } from "../store/features/authSlice";


export default function Register() {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
 const handleRegister = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await registerUser(name, email, password);
    dispatch(register(res.data.user))
    toast.success(res.message);   
    navigate("/");
  } catch (error: any) {
    const serverMessage =
      error.response?.data?.message || // From ApiError backend
      error.response?.data?.error ||   // Fallback
      error.message ||                 // Axios default
      "Registration failed";

    toast.error(serverMessage);
  }
};


  return (
    <section className="flex justify-center items-center min-h-screen px-4">
      <div className="card w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <RegisterForm onSubmit={handleRegister} />

        <p className="text-sm text-[var(--muted)] mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-[var(--primary)] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
