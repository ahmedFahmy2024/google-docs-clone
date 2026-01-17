import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getDocuments = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const document = await ctx.db
      .query("documents")
      .paginate(args.paginationOpts);
    return document;
  },
});

export const createDocuments = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const documentId = await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      initialContent: args.initialContent,
      ownerId: user.subject,
    });

    return documentId;
  },
});

export const removeDocument = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    if (document.ownerId !== user.subject) {
      throw new ConvexError("Unauthorized");
    }

    await ctx.db.delete(args.id);
  },
});

export const updateDocument = mutation({
  args: { id: v.id("documents"), title: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    if (document.ownerId !== user.subject) {
      throw new ConvexError("Unauthorized");
    }

    await ctx.db.patch(args.id, { title: args.title });
  },
});
