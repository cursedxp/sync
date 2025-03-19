import { useEffect, useState } from "react";
import { countries } from "@/app/lib/countries";
import { HiChevronDown } from "react-icons/hi2";
import Image from "next/image";

interface PhoneFieldProps {
  name: string;
  setFieldValue: (field: string, value: string) => void;
  value?: string;
  label: string;
}

export default function PhoneField({
  name,
  setFieldValue,
  label,
}: PhoneFieldProps) {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");

  // Sadece form değerini güncelle
  useEffect(() => {
    const fullPhoneNumber = `${selectedCountry.areaCode}${phoneNumber}`.trim();
    setFieldValue(name, fullPhoneNumber);
  }, [selectedCountry, phoneNumber, name, setFieldValue]);

  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col gap-2">
        <label htmlFor={name}>
          <span className="text-sm block mb-0">{label}</span>
        </label>
        <div className="relative w-[110px]">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Image
              src={`/images/flags/flag_${selectedCountry.value.toLowerCase()}_16.svg`}
              alt={`${selectedCountry.value} flag`}
              className="w-4 h-4"
              width={16}
              height={16}
            />
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <HiChevronDown className="w-4 h-4" />
          </div>
          <select
            name={`${name}_country`}
            value={selectedCountry.value}
            onChange={(e) => {
              const country = countries.find((c) => c.value === e.target.value);
              if (country) setSelectedCountry(country);
            }}
            className="w-full py-2.5 pl-10 pr-4 rounded-md border appearance-none cursor-pointer focus:ring-blue-500 border-gray-300"
          >
            {countries.map((country) => (
              <option key={country.value} value={country.value}>
                {country.areaCode}
              </option>
            ))}
          </select>
        </div>
      </div>
      <input
        type="tel"
        name={`${name}_number`}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Enter phone number"
        className="flex-1 py-2.5 px-4 mt-7 rounded-md border focus:ring-blue-500 border-gray-300"
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
      />
    </div>
  );
}
