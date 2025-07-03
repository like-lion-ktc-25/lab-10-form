import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

const schema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .required("Phone is required")
    .matches(/^[0-9]{10,11}$/, "Phone must be 10–11 digits"),
  password: Yup.string()
    .min(6, "Password too short")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const HookFormSignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    console.log("✅ SignUp data:", data);
    reset();
  };

  return (
    <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <input placeholder="Email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <input placeholder="Phone" {...register("phone")} />
      {errors.phone && <p>{errors.phone.message}</p>}

      <input type="password" placeholder="Password" {...register("password")} />
      {errors.password && <p>{errors.password.message}</p>}

      <input
        type="password"
        placeholder="Confirm Password"
        {...register("confirmPassword")}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
    </form>
  );
};

export default HookFormSignUpForm;
