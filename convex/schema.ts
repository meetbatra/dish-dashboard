import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  dishes: defineTable({
    dishId: v.string(),
    dishName: v.string(),
    imageUrl: v.string(),
    isPublished: v.boolean(),
  }),
});
