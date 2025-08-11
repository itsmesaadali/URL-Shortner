import React, { useState } from "react";
import InputField from "./UI/InputField";
import Spinner from "./UI/LoadingSVG";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      onSubmit(email, password);
    } catch (error: any) {
      setError( error.response.data?.message||error?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputField
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
        required
      />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
        required
      />
      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
      <button disabled={loading} className="btn-primary">
        {loading && <Spinner />}
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
