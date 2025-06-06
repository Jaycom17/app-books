import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookResponse } from "@/models/book/bookModels";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

/**
 * Item component for displaying a book with its details and actions.
 * @param { book, onDelete, children } - The book object to display, a function to call when the delete button is clicked, and optional children elements.
 * @returns
 */
export default function BookItem({
  book,
  onDelete,
  children,
}: {
  book: BookResponse;
  onDelete: (id: string) => void;
  children?: React.ReactNode;
}) {
  return (
    <Card key={book.id}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{book.title}</CardTitle>
            <p className="text-sm text-gray-600 mt-1">by {book.author}</p>
          </div>
          <Badge variant="secondary">{book.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Published: {book.year}</span>
          <div className="flex space-x-2">
            {children}
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(book.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
