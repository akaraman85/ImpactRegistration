"use server";

import { z } from "zod";
import { ensureSchema, sql } from "@/lib/db";

const childNameSchema = z
  .string()
  .trim()
  .max(50, "Child's name must be 50 characters or fewer.");

const registrationSchema = z
  .object({
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
    child1FirstName: childNameSchema,
    child2FirstName: childNameSchema,
    consent: z.boolean().refine((value) => value === true, {
      message: "You must agree to be contacted about the Impact program.",
    }),
  })
  .refine(
    (data) => Boolean(data.child1FirstName || data.child2FirstName),
    {
      message: "Please enter at least one child's first name.",
      path: ["child1FirstName"],
    },
  );

export type RegistrationState = {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    phone?: string[];
    child1FirstName?: string[];
    child2FirstName?: string[];
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
    child1FirstName: formData.get("child1FirstName") ?? "",
    child2FirstName: formData.get("child2FirstName") ?? "",
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
      INSERT INTO registrations (name, phone, child1_name, child2_name, consent)
      VALUES (
        ${parsed.data.name},
        ${parsed.data.phone},
        ${parsed.data.child1FirstName || null},
        ${parsed.data.child2FirstName || null},
        ${parsed.data.consent}
      )
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
