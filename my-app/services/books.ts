import { supabase } from "@/lib/supabase";
import { Book, BookResponse } from "@/models/book/bookModels";

/**
 * Function to fetch all books from the Supabase database.
 * @returns A promise that resolves to an array of BookResponse objects.
 */
export async function fetchBooks(): Promise<BookResponse[]> {
  const { data, error } = await supabase.from("books").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Function to fetch a single book by its ID.
 * @param id The ID of the book to fetch.
 * @returns A promise that resolves to a BookResponse object.
 */
export async function addBook(bookData: Book) {
  const { data, error } = await supabase.from("books").insert([bookData]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Function to update an existing book in the Supabase database.
 * @param id The ID of the book to update.
 * @param bookData The updated book data.
 * @returns A promise that resolves to the updated BookResponse object.
 */
export async function updateBook(id: string, bookData: Book) {
  const { data, error } = await supabase.from("books").update(bookData).eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

/**
 * Function to delete a book from the Supabase database.
 * @param id The ID of the book to delete.
 * @returns A promise that resolves to the deleted book data.
 */
export async function deleteBook(id: string) {
  const { data, error } = await supabase.from("books").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}