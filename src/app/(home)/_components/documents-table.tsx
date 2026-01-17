import type { PaginationStatus } from "convex/react";
import { LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Doc } from "../../../../convex/_generated/dataModel";
import { DocumentRow } from "./document-row";

type Props = {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
};

export const DocumentsTable = ({ documents, loadMore, status }: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-16 py-6 flex flex-col gap-5 w-full">
      {documents === undefined ? (
        <div className="flex items-center justify-center h-24">
          <LoaderIcon className="animate-spin text-muted-foreground size-5" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead>Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((document) => (
                <DocumentRow key={document._id} document={document} />
              ))}
            </TableBody>
          )}
        </Table>
      )}

      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => loadMore(5)}
          disabled={status !== "CanLoadMore"}
        >
          {status === "CanLoadMore" ? "Load more" : "End of documents"}
        </Button>
      </div>
    </div>
  );
};

/**
 * DocumentsTable Component
 *
 * A responsive, paginated table for displaying and managing documents.
 *
 * Props:
 * - documents: An array of document objects from Convex, or undefined while loading.
 * - loadMore: Function to trigger fetching of additional documents.
 * - status: Current pagination status (LoadingFirstPage, CanLoadMore, etc.).
 *
 * Logic:
 * 1. Loading State: Displays a spinner if `documents` is undefined.
 * 2. Empty State: Displays "No documents found" if the array is empty.
 * 3. Data State: maps through `documents` and renders a `DocumentRow` for each.
 * 4. Pagination: A "Load more" button at the bottom that is disabled if no more items exist.
 */
