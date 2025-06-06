import { supabase } from "@/lib/supabase";

/**
 * Function to sign up a new user with email and password.
 * @param email Email address of the user
 * @param password Password for the user account
 */
export async function signUp(email: string, password: string) {
  const result = await supabase.auth.signUp({
    email,
    password,
  });

  if (result.error) {
    throw new Error(result.error.message);
  }
}

/**
 * Function to sign in an existing user with email and password.
 * @param email Email address of the user
 * @param password Password for the user account
 */
export async function signIn(email: string, password: string) {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Function to sign out the currently authenticated user.
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

/**
 * Function to get the currently authenticated user.
 * @returns The currently authenticated user.
 */
export async function getUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  return user;
}

/**
 * Function to change the password of the currently authenticated user.
 * @param newPassword The new password for the user account
 */
export async function changePassword(newPassword: string) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    throw new Error(error.message);
  }
}
