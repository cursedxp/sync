"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import { BiLoaderAlt } from "react-icons/bi";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [verificationStatus, setVerificationStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get("token");

        if (!token) {
          setError("Verification token is missing");
          setVerificationStatus("error");
          return;
        }

        const response = await fetch(`/api/auth/verify?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Verification failed");
          setVerificationStatus("error");
          return;
        }

        setVerificationStatus("success");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } catch (error) {
        setError("An unexpected error occurred during verification");
        setVerificationStatus("error");
        console.error("Verification error:", error);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
        {verificationStatus === "loading" && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <BiLoaderAlt className="h-12 w-12 text-blue-500 animate-spin" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Verifying your email
            </h2>
            <p className="text-gray-500">
              Please wait while we verify your email address...
            </p>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 animate-pulse rounded-full" />
            </div>
          </div>
        )}

        {verificationStatus === "success" && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <AiOutlineCheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-500">
              Your email has been successfully verified. You will be redirected
              to the login page shortly.
            </p>
            <div className="pt-4">
              <Link
                href="/auth/login"
                className="w-full inline-flex justify-center py-3.5 px-4 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300"
              >
                Continue to Login
              </Link>
            </div>
          </div>
        )}

        {verificationStatus === "error" && (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <AiOutlineCloseCircle className="h-16 w-16 text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Verification Failed
            </h2>
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600">{error}</p>
              </div>
            )}
            <div className="pt-4 space-y-3">
              <Link
                href="/auth/login"
                className="w-full inline-flex justify-center py-3.5 px-4 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300"
              >
                Go to Login
              </Link>
              <Link
                href="/auth/register"
                className="w-full inline-flex justify-center py-3.5 px-4 rounded-xl border border-blue-500 text-blue-500 font-semibold hover:bg-blue-50 transition-colors duration-300"
              >
                Register a new account
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
