export interface FormInputProps {
  label: string;
  type: "text" | "number";
  value: string | number;
  placeholder: string;
  onChange: (value: string | number) => void;
}
