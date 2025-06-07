"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

/**
 * CustomAlert component creates a modal dialog that displays an alert message.
 * It includes an "Accept" button to confirm the action and a "Cancel" button to close the dialog.
 * @param {Object} props - The properties for the CustomAlert component.
 * @param {string} props.message - The alert message to display.
 * @param {Function} props.onAccept - The function to call when the "Accept" button is clicked.
 * @param {boolean} props.open - A boolean indicating whether the dialog is open.
 * @param {Function} props.setOpen - A function to set the open state of the dialog.
 */
export default function CustomAlert({
  message,
  onAccept,
  open,
  setOpen,
}: {
  message: string;
  onAccept: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alert</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500">{message}</p>
        <div className="flex justify-end gap-2">
          <Button
            onClick={() => {
              onAccept();
              setOpen(false);
            }}
          >
            Accept
          </Button>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
