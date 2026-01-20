import { auth } from "@clerk/nextjs/server";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { Document } from "./_components/document";

type Props = {
  params: Promise<{ documentId: Id<"documents"> }>;
};

export default async function DocumentIdPage({ params }: Props) {
  const { documentId } = await params;
  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const preloadDocument = await preloadQuery(
    api.documents.getDocument,
    {
      id: documentId,
    },
    { token },
    // we can use it without token so why we attach it cuz in client componenet it attach token by itself but here in server we need to attach it manually
    //again why we add it if we check for
    // const user = await ctx.auth.getUserIdentity();
    // if (!user) {
    //   throw new ConvexError("Unauthorized");
    // } we will not pass this because token we dont have but if we attach it here now we will pass it
  );

  return <Document preloadDocument={preloadDocument} />;
}
