import { useState } from "react";
import { useRouter } from "next/navigation";

type RegistrationForm = {
  email: string;
  password: string;
  countryOfBusiness: string;
  acceptTerms: boolean;
  newsLetterSubscription: boolean;
};

type ValidationError = {
  [key: string]: string[];
};

export function UseAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] =
    useState<ValidationError | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const register = async (formData: RegistrationForm) => {
    try {
      setIsLoading(true);
      setError(null);
      setValidationErrors(null);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.issues) {
          setValidationErrors(data.issues);
          return;
        }
        setError(data.error || "Registration failed");
        return;
      }

      setIsSuccess(true);
      router.push(
        `/auth/check-email?email=${encodeURIComponent(formData.email)}`
      );
      return data;
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error, validationErrors, isSuccess };
}
