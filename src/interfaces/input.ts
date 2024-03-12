export interface InputProps {
  values: string | number;
  handleChange?: (e: any) => void;
  handleBlur?: (e: any) => void;
  errors?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  label?: string;
  disabled?: boolean;
}
