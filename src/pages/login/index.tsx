// Login
import { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { setLoginDetails } from "../../redux/features/homeSlice";

import axiosInstance from "../../utils/axios_instance";
import { setCookie, setLocalStorageItem } from "../../utils/common";
import { loginInitialValues, loginSchema } from "../../schemas";
import Input from "../../components/common/Input";

const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: loginInitialValues,
      validationSchema: loginSchema,
      onSubmit: async (values, action) => {
        try {
          const response = await axiosInstance.post("/login", values);

          if (response?.data) {
            toast.success("Logged in successfully", {
              position: "top-center",
            });

            setCookie("accessToken", response?.data?.accessToken);
            setLocalStorageItem("user", response?.data?.user);
            dispatch(setLoginDetails(response?.data?.user));
            navigate("/");
          }
        } catch (error: any) {
          if (error?.response?.data) {
            toast.error(`Login failed. ${error?.response?.data} `, {
              position: "top-center",
            });
          }
        }

        action.resetForm();
      },
    });

  return (
    <div className="d-flex login  bg">
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
            <div className="text-white w-100 field-set mb-2">
              <Input
                className={`bg-dark input_field text-white h-100 w-100 ps-2`}
                type="email"
                id="email"
                name="email"
                label="Email"
                placeholder="Enter Email"
                values={values.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors.email && touched.email ? errors.email : ""}
              />
            </div>
            <div className="text-white w-100 field-set mb-2">
              <Input
                className={`bg-dark input_field text-white h-100 w-100 ps-2`}
                values={values.password}
                placeholder="Enter Password"
                id="password"
                label="Password"
                type="password"
                name="password"
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={
                  errors.password && touched.password ? errors.password : ""
                }
              />
            </div>
            <button
              type="submit"
              className="btn-block mx-auto d-block signup-button mt-4"
            >
              Sign In
            </button>
          </form>

          <p className="fw-semibold text-center text-white mt-3">
            Don't have an account?
            <Link to="/signup" className="ms-1 text-decoration-none">
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
