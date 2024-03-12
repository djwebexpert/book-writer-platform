import { useNavigate } from "react-router-dom";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/common";
import { User } from "../../interfaces/user";
import { useFormik } from "formik";
import axiosInstance from "../../utils/axios_instance";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";

import validationSchema from "../../schemas/profileValidation";
import Input from "../../components/common/Input";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user: User = getLocalStorageItem("user")!;
  const initialValues = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    password: "",
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    isValid,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      delete (values as any)["password"];
      try {
        const response = await axiosInstance.patch(`/users/${user.id}`, {
          ...values,
        });
        if (response.data) {
          toast.success("Profile updated successfully", {
            position: "top-center",
          });
          setLocalStorageItem("user", response.data);
          navigate("/");
        }
      } catch (error: any) {
        if (error?.response?.data) {
          toast.error(`Failed to update profile - ${error?.response?.data} `, {
            position: "top-center",
          });
        }
      }
    },
  });

  return (
    <div className="m-3">
      <div className="d-flex justify-content-between">
        <h2>My Profile</h2>
        <Button variant="outline-danger" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </div>

      <form className="container mt-5" onSubmit={handleSubmit}>
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h2 className="text-center">Edit Profile</h2>
              </div>
              <div className="card-body">
                <Input
                  values={values.email}
                  id="email"
                  name="email"
                  label="Email address"
                  className="form-control mb-3"
                  disabled
                />

                <Input
                  values={values.role}
                  id="role"
                  name="role"
                  label="Role"
                  className="form-control mb-3"
                  disabled
                />

                <Input
                  values={values.firstName}
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  className="form-control mb-3"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={
                    errors.firstName && touched.firstName
                      ? errors.firstName
                      : ""
                  }
                />

                <Input
                  values={values.lastName}
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  className="form-control mb-3"
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  errors={
                    errors.lastName && touched.lastName ? errors.lastName : ""
                  }
                />

                <button
                  type="submit"
                  className="btn btn-success btn-block d-block mx-auto "
                  disabled={!isValid}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
