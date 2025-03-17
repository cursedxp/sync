"use client";

import Link from "next/link";
import { BiMailSend } from "react-icons/bi";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/app/components/common/Button/button";

export default function CheckEmailPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleResendVerification = async () => {
    if (!email) return;

    try {
      setIsResending(true);
      setResendStatus(null);

      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to resend verification email");
      }

      setResendStatus({
        type: "success",
        message: "Verification email sent successfully!",
      });
    } catch (error) {
      setResendStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to resend verification email",
      });
    } finally {
      setIsResending(false);
    }
  };

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
            {email ? (
              <Button
                onClick={handleResendVerification}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? "Resending..." : "Resend verification email"}
              </Button>
            ) : (
              <Link
                href="/auth/login"
                className="inline-flex justify-center py-3.5 px-16 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors duration-300"
              >
                Try logging in
              </Link>
            )}
            {resendStatus && (
              <div
                className={`mt-4 p-4 rounded-lg ${
                  resendStatus.type === "success"
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-red-50 text-red-700 border border-red-200"
                }`}
              >
                <p>{resendStatus.message}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
