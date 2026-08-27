"use server";

import { z } from "zod";
import { ensureSchema, sql } from "@/lib/db";

const registrationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Name must be 100 characters or fewer."),
  phone: z
    .string()
    .trim()
    .min(10, "Please enter a valid phone number.")
    .max(20, "Phone number must be 20 characters or fewer.")
    .regex(
      /^[\d\s()+-]+$/,
      "Phone number can only contain digits, spaces, and +()-.",
    ),
  consent: z
    .boolean()
    .refine((value) => value === true, {
      message: "You must agree to be contacted about the Impact program.",
    }),
});

export type RegistrationState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    phone?: string[];
    consent?: string[];
  };
};

export async function submitRegistration(
  _prevState: RegistrationState,
  formData: FormData,
): Promise<RegistrationState> {
  const parsed = registrationSchema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    consent: formData.get("consent") === "on",
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await ensureSchema();
    await sql`
      INSERT INTO registrations (name, phone, consent)
      VALUES (${parsed.data.name}, ${parsed.data.phone}, ${parsed.data.consent})
    `;

    return {
      success: true,
      message: "Thank you! We will be in touch about the Impact program.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again in a moment.",
    };
  }
}
