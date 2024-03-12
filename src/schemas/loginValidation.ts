// Login validation
import * as Yup from "yup";

export const loginInitialValues = {
  email: "",
  password: "",
};

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email address Eg: example.123@mail.com")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and contain at least one letter and one number"
    ),
});
