import { NextResponse } from "next/server";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

// Ensure this API route is dynamically evaluated so it always fetches fresh data
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Fetch all dishes securely from the Next.js server
    const dishes = await fetchQuery(api.dishes.getDishes);

    // Map the dishes to only return the requested fields
    const formattedDishes = dishes.map((dish) => ({
      _id: dish._id, // Included so users know which ID to send to the toggle endpoint
      dishId: dish.dishId,
      dishName: dish.dishName,
      isPublished: dish.isPublished,
    }));

    return NextResponse.json({ success: true, dishes: formattedDishes }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching dishes:", error);
    return NextResponse.json(
      { error: "Failed to fetch dishes" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Missing dish ID in request body" },
        { status: 400 }
      );
    }

    const dishId = id as Id<"dishes">;
    
    // Call the Convex mutation securely from the Next.js server
    const updatedDish = await fetchMutation(api.dishes.togglePublished, { id: dishId });

    return NextResponse.json({ success: true, dish: updatedDish }, { status: 200 });
  } catch (error: any) {
    console.error("Error toggling dish:", error);
    return NextResponse.json(
      { error: error.message || "Failed to toggle dish" },
      { status: 500 }
    );
  }
}
