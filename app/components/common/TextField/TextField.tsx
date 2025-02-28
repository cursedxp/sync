"use client"

import { useField } from "formik"
import { useState } from "react"
import { HiEye, HiEyeSlash } from "react-icons/hi2"

interface TextFieldProps {
    label: string
    name: string
    type: string
    placeholder: string
    value?: string
}

const TextField: React.FC<TextFieldProps> = ({ label, name, type, placeholder, ...props }) => {
    const [field, meta] = useField(name)
    const [showPassword, setShowPassword] = useState(false)

    return(
        <div className="mb-4 relative">
            <label htmlFor={name}>
                <span className="text-sm block mb-1">{label}</span>
            </label>
            <input 
                type={showPassword ? "text" : type} 
                id={name} 
                placeholder={placeholder} 
                className={`w-full py-2.5 px-4 rounded-md border focus:ring-blue-500 ${meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'} ${type === "password" ? "pr-10" : ""}`} 
                {...field}
                {...props}
            />
            {type === "password" && (
                <button 
                    type="button" 
                    className="absolute top-6 right-0 flex items-center justify-center cursor-pointer p-3" 
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <HiEyeSlash className="text-gray-500 text-xl" /> : <HiEye className="text-gray-500 text-xl" />}
                </button>
            )}
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            ) : null}
        </div>
    )
}

export default TextField