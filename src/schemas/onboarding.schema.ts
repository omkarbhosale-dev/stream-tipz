import { z } from "zod";

export const onboardingSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username can't exceed 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),

  displayName: z
    .string()
    .min(3, "Display name must be at least 3 characters")
    .max(50, "Display name can't exceed 50 characters"),

  jwtToken: z.string().min(10, "JWT Token is too short"),

  bio: z
    .string()
    .max(250 * 6, "Bio must be less than 250 words") // ~6 chars avg per word

    .refine(
      (val) => val.split(/\s+/).filter(Boolean).length <= 250,
      "Bio cannot exceed 250 words"
    ),

  upiId: z
    .string()
    .regex(
      /^[\w.-]+@[\w.-]+$/,
      "UPI ID must be in a valid format like exposureee@upi"
    ),
});
