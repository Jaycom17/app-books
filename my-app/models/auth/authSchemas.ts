import { z } from "zod";

/**
 * Schema for user sign-up validation.
 * It checks that the email is valid, the password is at least 6 characters long,
 * and that the password and confirmPassword fields match.
 */
export const signUpSchema = z
  .object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z
      .string({ required_error: "Please confirm your password" })
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Schema for user sign-in validation.
 * It checks that the email is valid and the password is at least 6 characters long.
 */
export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

/**
 * Schema for changing user password validation.
 * It checks that the new password is at least 6 characters long,
 * and that the new password and confirmNewPassword fields match.
 */
export const changePasswordSchema = z
  .object({
    newPassword: z
      .string({ required_error: "New password is required" })
      .min(6, "New password must be at least 6 characters"),
    confirmNewPassword: z
      .string({ required_error: "Please confirm your new password" })
      .min(6, "New password must be at least 6 characters"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  });
