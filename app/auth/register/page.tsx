"use client";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import PasswordStrengthMeter from "@/app/components/common/PasswordStrengthMeter/PasswordStrengthMeter";
import TextField from "@/app/components/common/TextField/TextField";
import CheckBox from "@/app/components/common/CheckBox/CheckBox";
import Select from "@/app/components/common/Select/Select";

export default function RegisterPage() {
  const countries = [
    { value: "AT", label: "Austria" },
    { value: "BE", label: "Belgium" },
    { value: "BR", label: "Brazil" },
    { value: "BG", label: "Bulgaria" },
    { value: "CL", label: "Chile" },
    { value: "CO", label: "Colombia" },
    { value: "CY", label: "Cyprus" },
    { value: "CZ", label: "Czech Republic" },
    { value: "DK", label: "Denmark" },
    { value: "EE", label: "Estonia" },
    { value: "FI", label: "Finland" },
    { value: "FR", label: "France" },
    { value: "DE", label: "Germany" },
    { value: "GR", label: "Greece" },
    { value: "HU", label: "Hungary" },
    { value: "IE", label: "Ireland" },
    { value: "IT", label: "Italy" },
    { value: "LV", label: "Latvia" },
    { value: "LT", label: "Lithuania" },
    { value: "LU", label: "Luxemburg" },
    { value: "MT", label: "Malta" },
    { value: "MX", label: "Mexico" },
    { value: "NL", label: "Netherlands" },
    { value: "NO", label: "Norway" },
    { value: "PE", label: "Peru" },
    { value: "PL", label: "Poland" },
    { value: "PT", label: "Portugal" },
    { value: "RO", label: "Romania" },
    { value: "SK", label: "Slovakia" },
    { value: "SI", label: "Slovenia" },
    { value: "ES", label: "Spain" },
    { value: "SE", label: "Sweden" },
    { value: "CH", label: "Switzerland" },
    { value: "GB", label: "United Kingdom" },
    { value: "US", label: "United States" },
  ];

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl font-bold my-4">Register</h1>
        <div className="mb-4">
          <p>
            Already have an account?{" "}
            <Link href="/auth/login" className="font-semibold underline">
              Log in
            </Link>
          </p>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
            terms: false,
            news: false,
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Email is required"),
            password: Yup.string()
              .min(8, "Choose a password with at least 8 characters.")
              .required("Password is required"),
            terms: Yup.boolean()
              .oneOf(
                [true],
                "Accept the Terms and Conditions and Privacy Policy to continue"
              )
              .required(
                "Accept the Terms and Conditions and Privacy Policy to continue"
              ),
          })}
          onSubmit={(values, { setSubmitting }) => {
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <TextField
                label="Email address"
                name="email"
                type="email"
                placeholder="you@example.com"
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                placeholder=""
              />
              <PasswordStrengthMeter password={values.password} />
              <Select
                name=""
                value=""
                label=""
                options={countries}
                onChange={() => {}}
              />
              <CheckBox name="terms">
                <p>
                  By ticking this box you accept the{" "}
                  <Link href="/terms" className="underline">
                    Terms and Conditions
                  </Link>{" "}
                  and acknowledge that you have read and understood the{" "}
                  <Link href="/privacy" className="underline">
                    Privacy Policy
                  </Link>
                </p>
              </CheckBox>
              <CheckBox name="news">
                <p>
                  (Optional) We will occasionally contact you with our latest
                  news and offers. You can unsubscribe at any time. By ticking
                  this box you indicate that you do not want to be contacted.
                </p>
              </CheckBox>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-blue-500 text-white"
              >
                {isSubmitting ? "Submitting..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
