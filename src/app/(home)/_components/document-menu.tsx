import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreHorizontalIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Id } from "../../../../convex/_generated/dataModel";
import { RemoveDialog } from "./remove-dialog";
import { RenameDialog } from "./rename-dialog";

type Props = {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
};

export const DocumentMenu = ({ documentId, title, onNewTab }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontalIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RenameDialog documentId={documentId} initialTitle={title}>
          <DropdownMenuItem
            onClick={(e) => e.stopPropagation()}
            onSelect={(e) => e.preventDefault()}
          >
            <FilePenIcon className="mr-2 size-4" />
            Rename
          </DropdownMenuItem>
        </RenameDialog>

        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem
            onClick={(e) => e.stopPropagation()}
            onSelect={(e) => e.preventDefault()}
          >
            <TrashIcon className="mr-2 size-4" />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>

        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            onNewTab(documentId);
          }}
        >
          <ExternalLinkIcon className="mr-2 size-4" />
          Open in new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
