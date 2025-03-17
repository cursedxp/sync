"use client";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { UseAuth } from "@/app/hooks/useAuth";
import StepOne from "@/app/components/forms/registration/stepOne";
import StepTwo from "@/app/components/forms/registration/stepTwo";
import Button from "@/app/components/common/Button/button";
import { useState } from "react";
export default function RegisterPage() {
  const { register, isLoading, error, validationErrors } = UseAuth();
  const [step, setStep] = useState(1);

  return (
    <>
      <h1 className="text-4xl font-bold mb-2">Register</h1>
      <div className="mb-10">
        <p className="text-sm text-gray-500">
          Sign up and get 30 days free trial
        </p>
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          terms: false,
          newsLetterSubscription: false,
          country: "at",
          companyName: "",
          phoneNumber: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          region: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().required("Password is required"),
          terms: Yup.boolean()
            .oneOf(
              [true],
              "Accept the Terms and Conditions and Privacy Policy to continue"
            )
            .required(
              "Accept the Terms and Conditions and Privacy Policy to continue"
            ),
          newsLetterSubscription: Yup.boolean().optional(),
          companyName: Yup.string().required("Company Name is required"),
          phoneNumber: Yup.string().required("Phone Number is required"),
          addressLine1: Yup.string().required("Address Line 1 is required"),
          addressLine2: Yup.string().optional(),
          city: Yup.string().required("City is required"),
          region: Yup.string().optional(),
          zipCode: Yup.string().optional(),
        })}
        onSubmit={async (values) => {
          try {
            await register({
              email: values.email,
              password: values.password,
              countryOfBusiness: values.country,
              acceptTerms: values.terms,
              newsLetterSubscription: values.newsLetterSubscription,
            });
          } catch (error) {
            console.error("Registration error:", error);
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            {step === 1 && (
              <StepOne values={values} setFieldValue={setFieldValue} />
            )}

            {step === 2 && <StepTwo />}
            {step === 1 && (
              <Button
                onClick={() => {
                  if (
                    values.email &&
                    values.password &&
                    values.country &&
                    values.terms
                  ) {
                    setStep(2);
                  }
                }}
              >
                Next
              </Button>
            )}
            {step === 2 && (
              <Button type="submit">
                {isLoading ? "Registering..." : "Register"}
              </Button>
            )}
            <p className="text-center mt-4">
              Already have an account?
              <Link href="/auth/login" className="font-semibold underline ">
                Log in
              </Link>
            </p>
            {error && (
              <div className="py-4">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}
            {validationErrors && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <ul>
                  {Object.entries(validationErrors).map(([field, errors]) => (
                    <li key={field} className="text-red-600">
                      {field}: {errors.join(", ")}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}
