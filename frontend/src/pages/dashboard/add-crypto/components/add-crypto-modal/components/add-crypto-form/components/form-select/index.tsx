import { FormSelectProps } from "./interfaces";

export const FormSelect: React.FC<FormSelectProps> = ({
  label,
  options,
  value,
  placeholder,
  onChange,
}) => (
  <div className="group">
    <label className="block text-gray-400 mb-2 text-sm md:text-base font-medium">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-black text-white px-4 py-3 rounded-lg border border-[#2a2a2a] focus:border-purple-500 transition-colors duration-200 hover:border-purple-400 appearance-none"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);
