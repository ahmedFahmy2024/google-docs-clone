import { query } from "./_generated/server";

export const getDocuments = query({
  handler: async (ctx) => {
    const document = await ctx.db.query("documents").collect();
    return document;
  },
});
