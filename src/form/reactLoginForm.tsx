import { ChangeEvent, FormEvent, useState } from "react";

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const ReactLoginForm = () => {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    if (!form.email.includes("@")) newErrors.email = "Invalid email";
    if (form.password.length < 6) newErrors.password = "Password too short";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("✅ BasicReactForm data:", form);
      setForm({ email: "", password: "" });
      setErrors({});
    }
  };

  return (
    <form id="login-form" onSubmit={handleSubmit}>
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
    </form>
  );
};

export default ReactLoginForm;
