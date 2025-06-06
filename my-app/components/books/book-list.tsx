"use client";

import { useState, useEffect } from "react";
import { BookForm } from "./book-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BookResponse, Book } from "@/models/book/bookModels";

import { fetchBooks, addBook, deleteBook, updateBook } from "@/services/books";
import { signOut, getUser, changePassword } from "@/services/auth";

import { ChangePassword } from "../auth/changePassword";
import { ChangePasswordData } from "@/models/auth/authModels";

import BookItem from "./bookItem";

/**
 * BookList component that displays a list of books with search, filter, and sorting functionalities.
 * It allows users to add, update, and delete books, as well as change their password and sign out.
 * Created by V0 but modified by Jaycom17
 */
export function BookList() {
  const [books, setBooks] = useState<BookResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [orderBy, setOrderBy] = useState("none");
  const [successMessage, setSuccessMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks();

      setBooks(data || []);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleAddBook = async (bookData: Book) => {
    try {
      const user = await getUser();

      const bookWithUser = {
        ...bookData,
        user_id: user.id,
      };

      await addBook(bookWithUser);

      setSuccessMessage("Book added successfully");
      loadBooks();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpdateBook = async (id: string, bookData: Book) => {
    try {
      await updateBook(id, bookData);

      setSuccessMessage("Book updated successfully");
      loadBooks();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeleteBook = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await deleteBook(id);

      setSuccessMessage("Book deleted successfully");

      loadBooks();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const handleChangePassword = async (data: Partial<ChangePasswordData>) => {
    try {
      const user = await getUser();
      if (!user) {
        toast({
          title: "Error",
          description: "You must be signed in to change your password.",
          variant: "destructive",
        });
        return;
      }

      await changePassword(data.newPassword!);

      setSuccessMessage("Password changed successfully");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  let filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title!.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author!.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || book.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (orderBy === "title") {
    filteredBooks.sort((a, b) => a.title!.localeCompare(b.title!));
  }
  if (orderBy === "author") {
    filteredBooks.sort((a, b) => a.author!.localeCompare(b.author!));
  }
  if (orderBy === "year") {
    filteredBooks.sort((a, b) => a.year! - b.year!);
  }

  const categories = [...new Set(books.map((book) => book.category))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6 sm:flex-row flex-col gap-5">
        <h1 className="text-3xl font-bold">My books...</h1>
        <div className="flex :items-center gap-2 w-full sm:w-auto items-end sm:flex-row flex-col">
          <ChangePassword onSubmit={handleChangePassword} />
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search books..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <BookForm onSubmit={handleAddBook} />
      </div>

      <div className="flex justify-start mb-4">
        <Select value={orderBy} onValueChange={setOrderBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Order by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Order By...</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="year">Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {successMessage && (
        <div className="mb-4 p-4 bg-green-100 text-green-800 rounded">
          {successMessage}
        </div>
      )}

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {books.length === 0
              ? "No books in your collection yet."
              : "No books match your search."}
          </p>
          {books.length === 0 && <BookForm onSubmit={handleAddBook} />}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookItem key={book.id} book={book} onDelete={handleDeleteBook}>
              <BookForm
                book={book}
                onSubmit={(data) => handleUpdateBook(book.id, data)}
              />
            </BookItem>
          ))}
        </div>
      )}
    </div>
  );
}
