import { DishGrid } from "@/components/DishGrid";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafafa] dark:bg-background font-sans text-[#1a1a1a]">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-[1440px]">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-3 font-playfair">
            Dish Dashboard
          </h1>
          <p className="text-lg text-[#6b7280] max-w-2xl font-sans">
            Manage and publish your restaurant dishes
          </p>
        </header>

        <section>
          <DishGrid />
        </section>
      </div>
    </main>
  );
}
