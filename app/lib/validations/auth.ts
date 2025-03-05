import { z } from "zod"

export const initialRegisterSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
  countryOfBusiness: z
    .string()
    .min(2, "Business country is required"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "Terms and conditions must be accepted"),
  newsletterSubscription: z
    .boolean()
    .optional()
    .default(false)
})

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
  city: z
    .string()
    .min(2, "City must be at least 2 characters long"),
  state: z
    .string()
    .min(2, "State must be at least 2 characters long"),
  zipCode: z
    .string()
    .min(5, "Postal code must be at least 5 characters long"),
})