import { query, internalMutation } from "./_generated/server";

const initialDishes = [
  { dishId: "1", dishName: "Margherita Pizza", imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400", isPublished: true },
  { dishId: "2", dishName: "Spaghetti Carbonara", imageUrl: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400", isPublished: false },
  { dishId: "3", dishName: "Caesar Salad", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400", isPublished: true },
  { dishId: "4", dishName: "Beef Burger", imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400", isPublished: false },
  { dishId: "5", dishName: "Chicken Tikka Masala", imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400", isPublished: true },
  { dishId: "6", dishName: "Sushi Platter", imageUrl: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=400", isPublished: false },
  { dishId: "7", dishName: "Tacos al Pastor", imageUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400", isPublished: true },
  { dishId: "8", dishName: "Pad Thai", imageUrl: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400", isPublished: false }
];

export const getDishes = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("dishes").collect();
  },
});

export const seedDishes = internalMutation({
  args: {},
  handler: async (ctx) => {
    const existingDishes = await ctx.db.query("dishes").collect();
    if (existingDishes.length > 0) {
      console.log("Dishes already seeded. Skipping.");
      return;
    }

    for (const dish of initialDishes) {
      await ctx.db.insert("dishes", dish);
    }
    console.log("Successfully seeded dishes.");
  },
});
