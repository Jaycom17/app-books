import { useCallback } from "react"

type ToastOptions = {
  title: string
  description?: string
  variant?: "default" | "destructive"
}

/**
 * Custom hook for displaying toast notifications.
 */
export function useToast() {
  const toast = useCallback((options: ToastOptions) => {
    alert(`${options.title}${options.description ? ": " + options.description : ""}`)
  }, [])

  return { toast }
}