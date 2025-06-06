"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { ChangePasswordData } from "@/models/auth/authModels";

import { changePasswordSchema } from "@/models/auth/authSchemas";

import { useForm } from "react-hook-form";

import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPenIcon } from "lucide-react";

/**
 * ChangePassword component that allows users to change their password.
 * It uses a dialog to display the form and handles submission with validation.
 * Created by Jaycom17 with components from V0
 */
export function ChangePassword({ trigger, onSubmit }: { trigger?: React.ReactNode, onSubmit: (data: Partial<ChangePasswordData>) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [generalError, setGeneralError] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  useEffect(() => {
    if (generalError) {
      const timer = setTimeout(() => setGeneralError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [generalError]);

  const handleSubmitFunc = async (data: ChangePasswordData) => {
    try {
        setGeneralError("");
        onSubmit(data);
      reset();
      setOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setGeneralError(error.message);
      } else {
        setGeneralError("An unexpected error occurred.");
      }
      console.error("Error changing password:", error);
    }
  };

  const defaultTrigger = (
    <Button variant="outline">
      <UserPenIcon className="h-4 w-4 mr-2" />
      Change Password
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change your password</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSubmitFunc)} className="space-y-4">
          {generalError && (
            <p className="text-red-600 text-sm">{generalError}</p>
          )}
          <div className="space-y-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input
              id="signup-password"
              type="password"
              placeholder="new password"
              {...register("newPassword")}
            />
            {errors.newPassword && (
              <p className="text-red-600 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
            <Input
              id="signup-confirm-password"
              type="password"
              placeholder="Confirm your password"
              {...register("confirmNewPassword")}
            />
            {errors.confirmNewPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "..." : "Change Password"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
