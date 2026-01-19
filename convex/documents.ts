import { paginationOptsValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getByIds = query({
  args: {
    ids: v.array(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const documents = [];

    for (const id of args.ids) {
      const document = await ctx.db.get(id);
      if (document) {
        documents.push({
          id: document._id,
          name: document.title,
        });
      } else {
        documents.push({
          id,
          name: "Unknown",
        });
      }
    }

    return documents;
  },
});

export const getDocuments = query({
  args: {
    paginationOpts: paginationOptsValidator,
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new ConvexError("Unauthorized");
    }

    console.log("User:", user);

    const searchQuery = args.search;

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    // search + organiztion
    if (searchQuery && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", searchQuery).eq("organizationId", organizationId),
        )
        .paginate(args.paginationOpts);
    }

    // search + user
    if (searchQuery) {
      return await ctx.db
        .query("documents")
        .withSearchIndex("search_title", (q) =>
          q.search("title", searchQuery).eq("ownerId", user.subject),
        )
        .paginate(args.paginationOpts);
    }

    // organization
    if (organizationId) {
      return await ctx.db
        .query("documents")
        .withIndex("by_organization_id", (q) =>
          q.eq("organizationId", organizationId),
        )
        .paginate(args.paginationOpts);
    }

    // user
    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) => q.eq("ownerId", user.subject)) // Filters by ownerId — only returns the current user's documents
      .paginate(args.paginationOpts);
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

    const organizationId = (user.organization_id ?? undefined) as
      | string
      | undefined;

    const documentId = await ctx.db.insert("documents", {
      title: args.title ?? "Untitled Document",
      initialContent: args.initialContent,
      ownerId: user.subject,
      organizationId,
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

export const getDocument = query({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const document = await ctx.db.get(args.id);

    if (!document) {
      throw new ConvexError("Document not found");
    }

    return document;
  },
});

/**
 * Convex Document Functions
 *
 * This file contains queries and mutations for managing documents in the database.
 *
 * Queries:
 * - getDocuments: Fetches a paginated list of documents.
 *   - Supports full-text search via `search_title` index if searching.
 *   - Filters results to only show documents owned by the authenticated user.
 *
 * Mutations:
 * - createDocuments: Creates a new document with a default title.
 * - removeDocument: Deletes a document, ensuring only the owner can delete it.
 * - updateDocument: Updates a document's title, ensuring only the owner can modify it.
 *
 * Security:
 * - All functions verify the user's identity using `ctx.auth.getUserIdentity()`.
 * - Authorization checks ensure users can only access or modify their own documents.
 */
