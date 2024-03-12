// Book validation
import * as Yup from "yup";

export const bookValidationSchema = Yup.object().shape({
  bookName: Yup.string().required("Book name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .min(0, "Add valid price")
    .required("Price is required"),
});
