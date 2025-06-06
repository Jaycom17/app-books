"use client";

import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignInForm from "./signIn-form";
import SignUpForm from "./signUp-form";

/**
 * AuthForm component that renders the authentication form with sign-in and sign-up tabs.
 * Created by V0 but modified by Jaycom17
 */
export function AuthForm() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-0"> 
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Book Manager</CardTitle>
          <CardDescription>
            Sign in to manage your book collection
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <SignInForm />
            </TabsContent>

            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
