"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function getUsers() {
  const { orgId } = await auth();
  const clerk = await clerkClient();

  // If user is in an organization, get all organization members
  // Otherwise, just return the current user
  const response = await clerk.users.getUserList({
    organizationId: orgId ? [orgId] : undefined,
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    avatar: user.imageUrl,
  }));

  return users;
}

export async function getDocumentsByIds(ids: Id<"documents">[]) {
  return await convex.query(api.documents.getByIds, { ids });
}
