"use client";

import { signUp } from "@/services/auth";

import { zodResolver } from "@hookform/resolvers/zod";

import { SignUpData } from "@/models/auth/authModels";

import { signUpSchema } from "@/models/auth/authSchemas";

import { useForm } from "react-hook-form";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * SignUpForm component that allows users to sign up.
 * Created by V0 but modified by Jaycom17
 */
export default function SignUpForm() {
  const [generalError, setGeneralError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    if (generalError) {
      const timer = setTimeout(() => setGeneralError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [generalError]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const onSubmit = async (data: SignUpData) => {
    try {
      await signUp(data.email!, data.password!);

      setSuccessMessage("Account created successfully! Please check your email for confirmation.");
      setGeneralError("");

      reset();
    } catch (error: any) {
      setGeneralError(error.message || "An error occurred during sign up.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {generalError && <p className="text-red-600 text-sm">{generalError}</p>}
      {successMessage && (
        <p className="text-green-600 text-sm">{successMessage}</p>
      )}
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input
          id="signup-email"
          type="text"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input
          id="signup-password"
          type="password"
          placeholder="Create a password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
        <Input
          id="signup-confirm-password"
          type="password"
          placeholder="Confirm your password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-600 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  );
}
