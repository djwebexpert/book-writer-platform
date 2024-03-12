// Validation - Signup
import * as Yup from "yup";

export const signupInitialValues = {
  email: "",
  password: "",
  confirmPassword: "",
  firstName: "",
  lastName: "",
  role: "",
};

export const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and contain at least one letter and one number"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  firstName: Yup.string()
    .required("First Name is required")
    .matches(
      /^[A-Za-z]{3,}$/,
      "First Name must be at least 4 characters long and contain only letters"
    ),
  lastName: Yup.string()
    .required("Last Name is required")
    .matches(
      /^[A-Za-z]{4,}$/,
      "Last Name must be at least 4 characters long and contain only letters"
    ),
  role: Yup.string().required("Role is required"),
});
