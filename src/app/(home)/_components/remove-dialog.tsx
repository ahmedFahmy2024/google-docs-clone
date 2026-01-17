"use client";

import { useMutation } from "convex/react";
import { useTransition } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/helpers";

type Props = {
  documentId: Id<"documents">;
  children: React.ReactNode;
};

export const RemoveDialog = ({ documentId, children }: Props) => {
  const removeDocument = useMutation(api.documents.removeDocument);
  const [isPending, startTransition] = useTransition();

  const handleRemove = () => {
    startTransition(() => {
      removeDocument({ id: documentId })
        .then(() => {
          toast.success("Document removed successfully");
        })
        .catch((error) => {
          const message = getErrorMessage(error, "Failed to remove document");
          toast.error(message);
        });
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={(e) => e.stopPropagation()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove} disabled={isPending}>
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
