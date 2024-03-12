import * as Yup from "yup";

const initialValues = {
  email: "",
  firstName: "",
  lastName: "",
  role: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .notOneOf(
      [initialValues.firstName],
      "First name must not be the same as the previous name."
    )
    .matches(/^[a-zA-Z]+$/, "First name should only contain letters.")
    .min(4, "First name should be at least 4 characters long.")
    .required("First name is required."),
  lastName: Yup.string()
    .notOneOf(
      [initialValues.lastName],
      "Last name must not be the same as the previous name."
    )
    .matches(/^[a-zA-Z]+$/, "Last name should only contain letters.")
    .min(4, "Last name should be at least 4 characters long.")
    .required("Last name is required."),
});

export default validationSchema;
