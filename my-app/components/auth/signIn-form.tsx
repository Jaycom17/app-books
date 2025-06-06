"use client";

import { signIn } from "@/services/auth";

import { zodResolver } from "@hookform/resolvers/zod";

import { SignInData } from "@/models/auth/authModels";

import { signInSchema } from "@/models/auth/authSchemas";

import { useForm } from "react-hook-form";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/**
 * SignInForm component that allows users to sign in.
 * created by V0 but modified by Jaycom17
 */
export default function SignInForm() {
  const [generalError, setGeneralError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
  });

  useEffect(() => {
    if (generalError) {
      const timer = setTimeout(() => setGeneralError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [generalError]);

  const onSubmit = async (data: SignInData) => {
    try {
      await signIn(data.email!, data.password!);
      reset();
    } catch (error: any) {
      setGeneralError(error.message || "An error occurred during sign in.");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {generalError && <p className="text-red-600 text-sm">{generalError}</p>}
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <Input
          id="signin-email"
          type="text"
          placeholder="Enter your email"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="signin-password">Password</Label>
        <Input
          id="signin-password"
          type="password"
          placeholder="Enter your password"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
