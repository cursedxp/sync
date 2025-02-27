"use client"

import { useState } from "react"
import { HiEye } from "react-icons/hi2"
interface TextFieldProps{
    label: string
    name: string
    type: string
    placeholder: string
    value: string
}

const TextField: React.FC<TextFieldProps> = ({ label, name, type, placeholder, value }) => {
    const [textContent, setTextContent] = useState(value)
    const [showPassword, setShowPassword] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextContent(e.target.value)
    }
    return(
        <div className="mb-4 relative">
            <label htmlFor={name}>
                <span className="text-sm block mb-1">{label}</span>
            </label>
            <input type={showPassword ? "text" : type} id={name} name={name} className={`w-full py-2.5 px-4 rounded-md border border-gray-300 ${type === "password" ? "pr-10" : ""}`} placeholder={placeholder} value={textContent} onChange={handleChange} />
            {type === "password" && (
                <button type="button" className="absolute top-6 right-0 bottom-0 flex items-center justify-center cursor-pointer p-3" onClick={() => setShowPassword(!showPassword)}>
                    <HiEye className="text-gray-500 text-xl" />
                </button>
            )}
        </div>
    )
}

export default TextField