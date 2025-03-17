import { z } from "zod";
import zxcvbn from "zxcvbn";

//Initial register schema
export const initialRegisterSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().refine(
    (val) => {
      const result = zxcvbn(val);
      return result.score >= 3;
    },
    {
      message: "Password is too weak",
    }
  ),
  countryOfBusiness: z.string().min(2, "Business country is required"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "Terms and conditions must be accepted"),
  newsletterSubscription: z.boolean().optional().default(false),
});

//Complete registration schema
export const completeRegistrationSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  addressLine1: z.string().min(5, "Address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  region: z.string().optional(),
  zipCode: z
    .string()
    .regex(/^[A-Z0-9-\s]{3,10}$/i, "Invalid postal code format")
    .optional(),
});

//Login schema
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
//Profile completion schema
export const profileCompletionSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters long")
    .max(100, "Company name must be at most 100 characters long"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters long")
    .max(15, "Phone number must be at most 15 characters long"),
  addressLine1: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address must be at most 100 characters long"),
  addressLine2: z
    .string()
    .max(100, "Address must be at most 100 characters long")
    .optional(),
  city: z.string().min(2, "City must be at least 2 characters long"),
  state: z.string().min(2, "State must be at least 2 characters long"),
  zipCode: z.string().min(5, "Postal code must be at least 5 characters long"),
});
