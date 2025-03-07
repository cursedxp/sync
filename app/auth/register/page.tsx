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
    { value: "at", label: "Austria" },
    { value: "be", label: "Belgium" },
    { value: "br", label: "Brazil" },
    { value: "bg", label: "Bulgaria" },
    { value: "cl", label: "Chile" },
    { value: "co", label: "Colombia" },
    { value: "cy", label: "Cyprus" },
    { value: "cz", label: "Czech Republic" },
    { value: "dk", label: "Denmark" },
    { value: "ee", label: "Estonia" },
    { value: "fi", label: "Finland" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "gr", label: "Greece" },
    { value: "hu", label: "Hungary" },
    { value: "ie", label: "Ireland" },
    { value: "it", label: "Italy" },
    { value: "lv", label: "Latvia" },
    { value: "lt", label: "Lithuania" },
    { value: "lu", label: "Luxemburg" },
    { value: "mt", label: "Malta" },
    { value: "mx", label: "Mexico" },
    { value: "nl", label: "Netherlands" },
    { value: "no", label: "Norway" },
    { value: "pe", label: "Peru" },
    { value: "pl", label: "Poland" },
    { value: "pt", label: "Portugal" },
    { value: "ro", label: "Romania" },
    { value: "sk", label: "Slovakia" },
    { value: "si", label: "Slovenia" },
    { value: "es", label: "Spain" },
    { value: "se", label: "Sweden" },
    { value: "ch", label: "Switzerland" },
    { value: "gb", label: "United Kingdom" },
    { value: "us", label: "United States" },
  ];

  return (
    <>
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
          country: "at",
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
        {({ isSubmitting, values, setFieldValue }) => (
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
              name="country"
              label="Country of your business"
              options={countries}
              value={values.country}
              onChange={(value) => setFieldValue("country", value)}
              showFlag={true}
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
                (Optional) We will occasionally contact you with our latest news
                and offers. You can unsubscribe at any time. By ticking this box
                you indicate that you do not want to be contacted.
              </p>
            </CheckBox>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300"
            >
              {isSubmitting ? "Submitting..." : "Next"}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
}
