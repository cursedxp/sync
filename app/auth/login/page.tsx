"use client";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "@/app/components/common/TextField/TextField";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  return (
    <>
      <h1 className="text-4xl font-bold my-4">Login</h1>
      <div className="mb-4">
        <p>
          Don&apos;t have an account?
          <Link href="/auth/register" className="font-semibold underline">
            Register
          </Link>
        </p>
      </div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={async (values) => {
          const result = await signIn("credentials", {
            ...values,
            redirect: false,
          });

          if (result?.error) {
            setError(result.error);
          } else {
            router.push("/workspace");
          }
        }}
      >
        {({ isSubmitting }) => (
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
            <Link
              href="/auth/forgot-password"
              className="underline font-medium mb-4 block"
            >
              Forgot your password?
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
            {error && (
              <div className="py-4">
                <p className="text-red-600 text-center">{error}</p>
              </div>
            )}
          </Form>
        )}
      </Formik>
    </>
  );
}
