"use client";

import Link from "next/link";
import { BiMailSend } from "react-icons/bi";

export default function CheckEmailPage() {
  return (
    <>
      <div className="p-6 mb-4">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <BiMailSend className="h-16 w-16 text-blue-500" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Check your email
          </h2>
          <p className="text-gray-500">
            We have sent you a verification link to your email address. Please
            check your inbox and click the link to verify your account.
          </p>
          <div className="pt-4 space-y-3">
            <p className="text-sm text-gray-500">
              Did not receive the email? Check your spam folder or
            </p>
            <Link
              href="/auth/login"
              className="w-full inline-flex justify-center py-3.5 px-4 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300"
            >
              Try logging in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
