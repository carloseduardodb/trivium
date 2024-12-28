import { FormInputProps } from "./interfaces";

export const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  value,
  placeholder,
  onChange,
}) => (
  <div className="group">
    <label className="block text-gray-400 mb-2 text-sm md:text-base font-medium">
      {label}
    </label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) =>
        onChange(type === "number" ? Number(e.target.value) : e.target.value)
      }
      className="w-full bg-black text-white px-4 py-3 rounded-lg border border-[#2a2a2a] focus:border-purple-500 transition-colors duration-200 hover:border-purple-400"
    />
  </div>
);
