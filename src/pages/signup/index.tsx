// Signup
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import axiosInstance from "../../utils/axios_instance";
import { setCookie, setLocalStorageItem } from "../../utils/common";
import { SignupSchema, signupInitialValues } from "../../schemas";
import Input from "../../components/common/Input";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: signupInitialValues,
      validationSchema: SignupSchema,
      onSubmit: async (values) => {
        delete (values as any)["confirmPassword"];
        try {
          const response = await axiosInstance.post("/users", values);
          if (response.data) {
            toast.success("Signed-up successfully", {
              position: "top-center",
            });

            setCookie("accessToken", response.data.accessToken);
            setLocalStorageItem("user", response.data.user);
            navigate("/login");
          }
        } catch (error: any) {
          if (error?.response?.data) {
            toast.error(`Sign-up process failed. - ${error?.response?.data} `, {
              position: "top-center",
            });
          }
        }
      },
    });

  return (
    <div className="d-flex sign-up">
      <div className="w-50 p-0">
        <div className="h-100">
          <img
            src="/assets/library.jpg"
            alt="book-img"
            className="w-100 h-100 img-fluid object-fit-cover"
          />
          <p className="text-white overlay-text fw-semibold fs-5">
            Infinite Subsection Book Demo
          </p>
        </div>
      </div>
      <div className="w-50 p-0 position-relative bg-color">
        <div className="center-form">
          <form onSubmit={handleSubmit} className="w-75 mx-auto">
            <h1 className="fs-3 fw-bold text-center text-white pb-5">
              Cloud Books
            </h1>

            {/* Email input */}
            <div className="text-white w-100 field-set mb-3">
              <Input
                className={`bg-dark input_field text-white h-100 w-100 ps-2`}
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                values={values.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.email && touched.email ? errors.email : ""}
              />
            </div>
            <div className="text-white w-100 field-set mb-3">
              {/* password input */}
              <Input
                className={`bg-dark input_field text-white h-100 w-100 ps-2`}
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                values={values.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={
                  errors.password && touched.password ? errors.password : ""
                }
              />
            </div>
            <div className="text-white w-100 field-set mb-3">
              {/* confirm password input */}
              <Input
                className={`bg-dark input_field text-white h-100 w-100 ps-2`}
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                values={values.confirmPassword}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={
                  errors.confirmPassword && touched.confirmPassword
                    ? errors.confirmPassword
                    : ""
                }
              />
            </div>
            <div className="text-white w-100 field-set mb-3">
              {/* First name input*/}
              <Input
                className={`bg-dark input_field text-white h-100 w-100 ps-2`}
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                values={values.firstName}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={
                  errors.firstName && touched.firstName ? errors.firstName : ""
                }
              />
            </div>
            <div className="text-white w-100 field-set mb-3">
              {/* Last name input */}
              <Input
                className={`bg-dark input_field text-white h-100 w-100 ps-2`}
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                values={values.lastName}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={
                  errors.lastName && touched.lastName ? errors.lastName : ""
                }
              />
            </div>
            <div className="mb-3">
              <div className="bg-dark text-white w-100  field-set">
                <select
                  className={`bg-dark input_field text-white h-100 w-100 ps-2`}
                  id="role"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="author">Author</option>
                  <option value="collaborator">Collaborator</option>
                </select>
              </div>
              {errors.role && touched.role && (
                <p className="text-danger mt-1">{errors.role}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn-block mx-auto d-block signup-button mt-5"
            >
              Sign Up
            </button>
          </form>
          <div>
            <p className="fw-semibold text-center text-white mt-3">
              Already have an account?
              <Link to="/login" className="ms-1 text-decoration-none">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
