"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

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
