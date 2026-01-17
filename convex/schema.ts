import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()),
    ownerId: v.string(),
    roomId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
  })
    .index("by_owner_id", ["ownerId"])
    .index("by_organization_id", ["organizationId"])
    .searchIndex("search_title", {
      searchField: "title",
      filterFields: ["organizationId", "ownerId"], // we only want to search documents that belong to the organizationId or ownerId of user
    }),
});

/**
 * Convex Database Schema
 *
 * Defines the structure and indexing of the database tables.
 *
 * Tables:
 * - documents:
 *   - title: String (Required)
 *   - initialContent: String (Optional) - Store initial document data.
 *   - ownerId: String (Required) - Clerk user ID of the creator.
 *   - roomId: String (Optional) - Liveblocks room ID for collaboration.
 *   - organizationId: String (Optional) - ID for multi-tenant support.
 *
 * Indexes:
 * - by_owner_id: Efficiently query documents belonging to a specific user.
 * - by_organization_id: Efficiently query documents within an organization.
 * - search_title: Full-text search index on the title field, with filters for ownership/access.
 */
