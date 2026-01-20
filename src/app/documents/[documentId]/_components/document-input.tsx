/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */

import { useStatus } from "@liveblocks/react";
import { useMutation } from "convex/react";
import { CloudOffIcon, CloudSync, LoaderIcon } from "lucide-react";
import { useRef, useState } from "react";
import { BsCloudCheck } from "react-icons/bs";
import { toast } from "sonner";
import { useDebounce } from "@/hooks/use-debounce";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const status = useStatus();
  const [value, setValue] = useState(title);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updateDocument);

  const debouncedUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setIsPending(true);
    mutate({ id, title: newValue })
      .then(() => {
        setIsPending(false);
        toast.success("Document updated successfully");
      })
      .catch(() => {
        setIsPending(false);
        toast.error("Failed to update document");
      });
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedUpdate(newValue);
  };

  const showLoader =
    status === "connecting" || status === "reconnecting" || isPending;

  const showError = status === "disconnected";

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form className="relative w-fit max-w-50ch">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsEditing(false);
              }
            }}
            className="absolute inset-0 px-1.5 text-lg text-black bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title}
        </span>
      )}
      {!showError && !showLoader && <BsCloudCheck />}
      {showLoader && (
        <LoaderIcon className="animate-spin size-4 text-muted-foreground" />
      )}
      {showError && <CloudOffIcon className="size-4 text-destructive" />}
    </div>
  );
};
