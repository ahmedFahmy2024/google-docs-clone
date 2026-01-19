"use client";

import { getDocumentsByIds, getUsers } from "@/actions/actions";
import { FullScreenLoader } from "@/components/full-screen-loader";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Id } from "../../../../../convex/_generated/dataModel";

type User = {
  id: string;
  name: string;
  avatar: string;
};

export function Room({ children }: { children: ReactNode }) {
  const { documentId } = useParams();
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const list = await getUsers();
      setUsers(list);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <LiveblocksProvider
      authEndpoint={async () => {
        const endpoint = "/api/liveblocks-auth";
        const room = documentId as string;
        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ room }),
        });
        return res.json();
      }}
      throttle={16}
      resolveUsers={async ({ userIds }) => {
        return userIds.map((userId) => {
          const user = users.find((u) => u.id === userId);
          return user ? { name: user.name, avatar: user.avatar } : undefined;
        });
      }}
      resolveMentionSuggestions={async ({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(text.toLowerCase()),
          );
        }

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocumentsByIds(roomIds as Id<"documents">[]);
        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider id={documentId as string}>
        <ClientSideSuspense
          fallback={<FullScreenLoader label="Room loading" />}
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
