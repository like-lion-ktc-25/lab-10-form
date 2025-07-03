import { useFormik } from "formik";
import * as Yup from "yup";

interface SignUpFormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10,11}$/, "Phone must be 10–11 digits")
    .required("Phone is required"),
  password: Yup.string().min(6, "Too short").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

const FormikSignUpForm = () => {
  const formik = useFormik<SignUpFormData>({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("✅ Formik SignUp data:", values);
      formik.resetForm();
    },
  });

  return (
    <form id="signup-form" onSubmit={formik.handleSubmit}>
      <input
        name="name"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      {formik.errors.name && <p>{formik.errors.name}</p>}

      <input
        name="email"
        placeholder="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      {formik.errors.email && <p>{formik.errors.email}</p>}

      <input
        name="phone"
        placeholder="Phone"
        value={formik.values.phone}
        onChange={formik.handleChange}
      />
      {formik.errors.phone && <p>{formik.errors.phone}</p>}

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />
      {formik.errors.password && <p>{formik.errors.password}</p>}

      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
      />
      {formik.errors.confirmPassword && <p>{formik.errors.confirmPassword}</p>}
    </form>
  );
};

export default FormikSignUpForm;
