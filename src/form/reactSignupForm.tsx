import { ChangeEvent, FormEvent, useState } from "react";

interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const ReactSignUpForm = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};

    if (!form.name) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Invalid email";
    if (!/^[0-9]{10,11}$/.test(form.phone))
      newErrors.phone = "Phone must be 10–11 digits";
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) newErrors.password = "Too short";
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log("✅ Basic SignUp data:", form);
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
    }
  };

  return (
    <form id="signup-form" onSubmit={handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />
      {errors.name && <p>{errors.name}</p>}

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />
      {errors.phone && <p>{errors.phone}</p>}

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />
      {errors.password && <p>{errors.password}</p>}

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={form.confirmPassword}
        onChange={handleChange}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
    </form>
  );
};

export default ReactSignUpForm;
