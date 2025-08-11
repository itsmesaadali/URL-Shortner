import toast from "react-hot-toast";
import { registerUser } from "../api/user.api";
import RegisterForm from "../components/RegisterForm";
import {Link, useNavigate } from 'react-router-dom'


export default function Register() {

  const navigate = useNavigate()
  const handleRegister = async(
    name: string,
    email: string,
    password: string,
  ) => {
    console.log("Register data:", { name, email, password });
     try {
      const res = await registerUser(name, email, password);

      if (!res.success) {
        throw new Error(res.message || "Register failed");
      }

      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);

      toast.success(`Welcome back, ${res.data.user.name}!`);

      navigate("/");
    } catch (error: any) {
      toast.error("Something went wrong");

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
