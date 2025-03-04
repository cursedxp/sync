import React from "react";
import { HiChevronDown } from "react-icons/hi2";
import { useRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  name: string;
  label: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  placeholder,
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleClick = () => {
    if (selectRef.current) {
      selectRef.current.focus();
      selectRef.current.click();
    }
  };

  return (
    <div className="relative">
      <label htmlFor={name}>
        <span className="text-sm block mb-1">{label}</span>
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full py-2.5 px-4 rounded-md border appearance-none cursor-pointer"
        ref={selectRef}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button 
        type="button"
        className="absolute p-4 right-0 top-1/2 -translate-y-1/2 pointer-events-none" 
        onClick={handleClick}
        aria-label="Open select dropdown"
      >
        <HiChevronDown className="text-gray-600" />
      </button>
    </div>
  );
};

export default Select;
