import { useField } from "formik"
import { HiCheck } from "react-icons/hi2"
interface CheckBoxProps {
    name: string
    children?: React.ReactNode
    className?: string
}

const CheckBox:React.FC<CheckBoxProps> = ({ name, children, className }) => {
    const [field, meta, helpers] = useField(name)
   
    return (
        <div className={`flex flex-col my-4 ${className}`}> 
            <div className="flex gap-2 ">
            <input type="checkbox" id={name} {...field} className="hidden"/>
            <div className="w-5 h-5 border border-gray-300 rounded-md flex items-center justify-center mt-1 flex-shrink-0 cursor-pointer" onClick={() => {
                helpers.setValue(!field.value)
            }}>
                {field.value && (
                <div className="w-5 h-5 bg-blue-500 rounded-md flex items-center justify-center">
                     <HiCheck className="text-white text-xl" />
                </div>
                )}
            </div>
            <label htmlFor={name} className="cursor-pointer" onClick={() => {
                helpers.setValue(!field.value)
            }}>{children}</label>
            </div>
            {meta.touched && meta.error ? (
                <div className="text-red-500 text-sm mt-1 ml-7">{meta.error}</div>
            ) : null}
        </div>
    )
}
export default CheckBox