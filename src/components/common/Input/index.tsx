import { FC } from "react";
import { InputProps } from "../../../interfaces/input";

const Input: FC<InputProps> = ({
  values = "",
  handleChange = () => void 0,
  handleBlur = () => void 0,
  errors = "",
  id = "",
  name = "",
  placeholder = "",
  type = "text",
  className = "",
  label = "",
  disabled = false,
}: any) => {
  return (
    <>
      {label && (
        <label className="fw-semibold mb-1 mt-1 form-label">{label}</label>
      )}
      <input
        disabled={disabled}
        type={type}
        className={className}
        id={id}
        name={name}
        placeholder={placeholder}
        value={values}
        onChange={handleChange}
        onBlur={handleBlur}
        autoComplete="off"
      />
      {errors && <span className="text-danger mb-4">{errors}</span>}
    </>
  );
};

export default Input;
