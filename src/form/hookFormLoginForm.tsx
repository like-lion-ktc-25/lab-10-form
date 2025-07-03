import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}

const schema = Yup.object({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const HookFormLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log("✅ Hook Form data:", data);
    reset();
  };

  return (
    <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Email" {...register("email")} />
      {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      <input type="password" placeholder="Password" {...register("password")} />
      {errors.password && (
        <p style={{ color: "red" }}>{errors.password.message}</p>
      )}
    </form>
  );
};

export default HookFormLoginForm;
