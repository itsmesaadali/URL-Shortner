import React, { useState } from "react";
import InputField from "./UI/InputField";
import Spinner from "./UI/LoadingSVG";

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
}

export default function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onSubmit(name, email, password);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputField
        label="Full Name"
        placeholder="Enter your full name"
        value={name}
        onChange={setName}
        required
      />
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
        placeholder="Create a password"
        value={password}
        onChange={setPassword}
        required
      />
      <button disabled={loading} className="btn-primary">
        {loading && <Spinner />}
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
