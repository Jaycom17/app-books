"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Book } from "@/models/book/bookModels"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit } from "lucide-react"

import { zodResolver } from "@hookform/resolvers/zod";

import { bookSchema } from "@/models/book/bookSchema"

import { useForm, Controller } from "react-hook-form";

interface BookFormProps {
  book?: Book
  onSubmit: (bookData: Book) => Promise<void>
  trigger?: React.ReactNode
}

const categories = [
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
  "Other",
]

/**
 * Form component for adding or editing a book.
 * Created by V0 but modified by Jaycom17
 * @param { book, onSubmit, trigger } - The book object to edit (optional), the function to call on form submission, and an optional trigger element. 
 * @returns 
 */
export function BookForm({ book, onSubmit, trigger }: BookFormProps) {
  const [open, setOpen] = useState(false)
 
  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
      control,
    } = useForm<Book>({
      resolver: zodResolver(bookSchema),
    });

  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        author: book.author,
        year: book.year,
        category: book.category,
      });
    }
  },[book, reset]);

  const handleFormSubmit = async (data: Book) => {
    try {
      await onSubmit(data);
      reset();
      setOpen(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error submitting book form:", error.message);
      } else {
        console.error("An unexpected error occurred while submitting the book form.");
      }
    }
  }

  const defaultTrigger = book ? (
    <Button variant="outline" size="sm">
      <Edit className="h-4 w-4" />
    </Button>
  ) : (
    <Button>
      <Plus className="h-4 w-4 mr-2" />
      Add Book
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{book ? "Edit Book" : "Add New Book"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-red-600 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              {...register("author")}
            />
            {errors.author && (
              <p className="text-red-600 text-sm">{errors.author.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Input
              id="year"
              type="number"
              defaultValue={book?.year ?? new Date().getFullYear()}
              {...register("year", { valueAsNumber: true })}
            />
            {errors.year && (
              <p className="text-red-600 text-sm">{errors.year.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-600 text-sm">{errors.category.message}</p>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : book ? "Update" : "Add Book"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
