"use client";

import { useMutation } from "convex/react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/helpers";
import { api } from "../../../../convex/_generated/api";
import { Doc, type Id } from "../../../../convex/_generated/dataModel";

type Props = {
  documentId: Id<"documents">;
  initialTitle: string;
  children: React.ReactNode;
};

export const RenameDialog = ({ documentId, initialTitle, children }: Props) => {
  const updateDocument = useMutation(api.documents.updateDocument);
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      updateDocument({
        id: documentId,
        title: title.trim() || "Untitled Document",
      })
        .then(() => {
          toast.success("Document renamed successfully");
          setOpen(false);
        })
        .catch((error) => {
          const message = getErrorMessage(error, "Failed to rename document");
          toast.error(message);
        });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Give your document a new name.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              placeholder="Document name"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild onClick={(e) => e.stopPropagation()}>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending || title.trim() === ""}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
