/**
 * Category type for book genres.
 */
type Category =
  "Fiction" |
  "Non-Fiction" |
  "Science Fiction" |
  "Fantasy" |
  "Mystery" |
  "Romance" |
  "Thriller" |
  "Biography" |
  "History" |
  "Science" |
  "Technology" |
  "Self-Help" |
  "Other";

/**
 * Book interface representing the structure of a book object.
 * @property {string} [title] - The title of the book.
 * @property {string} [author] - The author of the book.
 * @property {number} [year] - The year the book was published.
 * @property {Category} [category] - The category or genre of the book.
 */
export interface Book{
  title: string
  author: string
  year: number
  category: Category
}

/**
 * Response interface for a book object returned from an API.
 * @property {string} id - The unique identifier of the book.
 * @property {string} title - The title of the book.
 * @property {string} author - The author of the book.
 * @property {number} year - The year the book was published.
 * @property {Category} category - The category or genre of the book.
 * @property {string} user_id - The ID of the user who created the book entry.
 * @property {string} created_at - The timestamp when the book was created.
 */
export interface BookResponse {
  id: string
  title: string
  author: string
  year: number
  category: Category
  user_id: string
  created_at: string
}