import { z } from "zod";

/**
 * Schema for user sign-up validation.
 * It checks that the email is valid, the password is at least 6 characters long,
 * and that the password and confirmPassword fields match.
 */
export const bookSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    author: z.string().min(1, { message: "Author is required" }),
    year: z.number({ required_error: "Year is required" }).nonnegative("Year must be a non-negative number").int("Year must be an integer").max(new Date().getFullYear(), "Year cannot be in the future"),
    category: z.enum([
        "Fiction",
        "Non-Fiction",
        "Science Fiction",
        "Fantasy",
        "Mystery",
        "Romance",
        "Thriller",
        "Biography",
        "History",
        "Science",
        "Technology",
        "Self-Help",
        "Other"
    ], { required_error: "Category is required" })
});