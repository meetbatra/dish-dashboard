"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DishCard } from "./DishCard";

export function DishGrid() {
  const dishes = useQuery(api.dishes.getDishes);

  if (dishes === undefined) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-[420px] w-full rounded-2xl bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (dishes.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px] border-none rounded-2xl bg-white shadow-[0px_4px_20px_rgba(0,0,0,0.04)] dark:bg-gray-900/20">
        <p className="text-[#6b7280] text-lg font-sans">No dishes found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {dishes.map((dish) => (
        <DishCard key={dish._id} dish={dish} />
      ))}
    </div>
  );
}
