"use client";

import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Dish } from "@/types/dish";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface DishCardProps {
  dish: Dish;
}

export function DishCard({ dish }: DishCardProps) {
  const togglePublished = useMutation(api.dishes.togglePublished)
    .withOptimisticUpdate((localStore, args) => {
      const currentDishes = localStore.getQuery(api.dishes.getDishes, {});
      if (currentDishes !== undefined) {
        const updated = currentDishes.map((d) =>
          d._id === args.id
            ? { ...d, isPublished: !d.isPublished }
            : d
        );
        localStore.setQuery(api.dishes.getDishes, {}, updated);
      }
    });

  const handleToggle = async () => {
    try {
      await togglePublished({ id: dish._id as Id<"dishes"> });
    } catch (error) {
      console.error("Failed to toggle published status", error);
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden h-full p-0 bg-white dark:bg-gray-900 shadow-[0px_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_10px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300 rounded-2xl border-none">
      <div className="relative w-full h-[240px] overflow-hidden bg-muted rounded-t-2xl">
        <Image
          src={dish.imageUrl}
          alt={dish.dishName}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="flex flex-col items-start gap-4 p-6 pb-2">
        <h2 className="text-2xl font-semibold leading-tight font-playfair text-[#1a1a1a] dark:text-white">{dish.dishName}</h2>
        {dish.isPublished ? (
          <Badge className="bg-[#e6f8f1] hover:bg-[#d1f4e5] text-[#00714d] rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase border-none">
            Published
          </Badge>
        ) : (
          <Badge className="bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#6b7280] rounded-full px-3 py-1 text-xs font-semibold tracking-wider uppercase border-none">
            Unpublished
          </Badge>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-4 mt-auto flex items-center bg-transparent">
        <div className="flex items-center space-x-3 w-full">
          <Switch
            id={`publish-toggle-${dish._id}`}
            checked={dish.isPublished}
            onCheckedChange={handleToggle}
            className="data-checked:bg-[#10b981] data-unchecked:bg-[#e5e7eb]"
          />
          <label
            htmlFor={`publish-toggle-${dish._id}`}
            className="text-sm font-medium leading-none cursor-pointer select-none text-[#444748] dark:text-gray-400 font-sans tracking-wide uppercase text-xs"
          >
            {dish.isPublished ? "Published" : "Unpublished"}
          </label>
        </div>
      </CardFooter>
    </Card>
  );
}
