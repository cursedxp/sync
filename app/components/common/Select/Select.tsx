import React from "react";
import { HiChevronDown } from "react-icons/hi2";
import { useRef } from "react";
import Image from "next/image";
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
  showFlag?: boolean;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  placeholder,
  showFlag = true,
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
        className={`w-full py-2.5 px-4 rounded-md border appearance-none cursor-pointer ${showFlag && value ? "pl-12" : ""}`}
        ref={selectRef}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {showFlag && value && (
        <div className="absolute w-12 h-12 left-0 top-6 pointer-events-none flex items-center justify-center">
          <Image
            src={`/images/flags/flag_${value.toLowerCase()}_16.svg`}
            alt={`${value} flag`}
            className="w-4 h-4 "
            width={16}
            height={16}
          />
        </div>
      )}
      <button 
        type="button"
        className="absolute p-4 right-0 top-6 pointer-events-none" 
        onClick={handleClick}
        aria-label="Open select dropdown"
      >
        <HiChevronDown className="text-gray-600" />
      </button>
    </div>
  );
};

export default Select;
