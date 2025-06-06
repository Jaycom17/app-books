import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Utility function to merge class names conditionally.
 * Combines clsx and tailwind-merge for better class name management.
 * @param inputs - Class names or conditional class names to merge.
 * @returns Merged class names as a string.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
