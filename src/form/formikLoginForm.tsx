import { useFormik } from "formik";
import * as Yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}

const FormikLoginForm = () => {
  const formik = useFormik<LoginFormValues>({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Too short").required("Required"),
    }),
    onSubmit: (values) => {
      console.log("✅ Formik data:", values);
    },
  });

  return (
    <form id="login-form" onSubmit={formik.handleSubmit}>
      <input
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.errors.email && (
        <p style={{ color: "red" }}>{formik.errors.email}</p>
      )}

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      {formik.errors.password && (
        <p style={{ color: "red" }}>{formik.errors.password}</p>
      )}
    </form>
  );
};

export default FormikLoginForm;
