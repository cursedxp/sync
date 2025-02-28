"use client"
import {Formik, Form} from "formik"
import * as Yup from "yup"


import Link from "next/link"
import TextField from "@/app/components/common/TextField/TextField"
import CheckBox from "@/app/components/common/CheckBox/CheckBox"

export default function RegisterPage() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="max-w-xl w-full">
                <h1 className="text-4xl font-bold my-4">Register</h1>
                <div className="mb-4">
                    <p>Already have an account? <Link href="/auth/login" className="font-semibold underline">Log in</Link></p>
                </div>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        terms: false,
                        news: false,
                    }}
                    validationSchema={Yup.object({
                        email: Yup.string().email("Invalid email address").required("Email is required"),
                        password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
                        terms: Yup.boolean().oneOf([true], "Accept the Terms and Conditions and Privacy Policy to continue").required("Accept the Terms and Conditions and Privacy Policy to continue"),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values)
                        setSubmitting(false)
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <TextField label="Email address" name="email" type="email" placeholder="you@example.com" />
                            <TextField label="Password" name="password" type="password" placeholder="" />
                            <CheckBox  name="terms" >
                                <p>By ticking this box you accept the <Link href="/terms" className="underline">Terms and Conditions</Link> and acknowledge that you have read and understood the <Link href="/privacy" className="underline">Privacy Policy</Link></p>
                            </CheckBox>

                            <CheckBox name="news">
                                <p>(Optional) We will occasionally contact you with our latest news and offers. You can unsubscribe at any time. By ticking this box you indicate that you do not want to be contacted.</p>
                            </CheckBox>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="w-full py-3 px-4 rounded-xl bg-blue-500 text-white"
                            >
                                {isSubmitting ? 'Submitting...' : 'Register'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}