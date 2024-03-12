export interface DialogBoxProps {
  title: string;
  buttonText: string;
  onButtonClick?: (values: any) => void;
  onClose?: () => void;
  isFormVisible?: boolean;
}
