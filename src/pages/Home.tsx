import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { filterByIngredient, searchByName, getMeal } from "../api/meals";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import RecipeCard from "../components/RecipeCard";
import RecipeDrawer from "../components/RecipeDrawer";
import { SkeletonCard } from "../components/SkeletonCard";

export default function Home() {
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<"ingredient" | "name">("ingredient");
  const [openId, setOpenId] = useState<string | null>(null);

  const { data: meals = [], isFetching, isError, refetch } = useQuery({
    queryKey: ["meals", q, mode],
    queryFn: () =>
      mode === "ingredient"
        ? filterByIngredient(q || "chicken")
        : searchByName(q || "chicken"),
  });

  function handleSearch(next: string, m: "ingredient" | "name") {
    setQ(next);
    setMode(m);
    refetch();
  }

  async function handleRandom() {
    // TheMealDB random endpoint is /random.php; but we’ll reuse get from "search chicken" and pick one randomly for simplicity.
    const randQ = ["chicken", "paneer", "pasta", "rice"][Math.floor(Math.random() * 4)];
    setQ(randQ);
    setMode("name");
    refetch();
  }

  return (
    <div className="space-y-8">
      {/* HERO */}
      <Hero onRandom={handleRandom} />

      {/* SEARCH */}
      <div className="container-main">
        <SearchBar
          onSearch={handleSearch}
          onChipClick={(c) => setQ(c)}
        />

        {/* RESULTS */}
        <div className="mt-6">
          {isFetching && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {!isFetching && !isError && meals.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {meals.map((m: any) => (
                <RecipeCard key={m.idMeal} meal={m} onOpen={setOpenId} />
              ))}
            </div>
          )}

          {!isFetching && meals.length === 0 && (
            <div className="card glass mx-auto mt-6 max-w-2xl p-10 text-center">
              <h3 className="text-lg font-semibold text-slate-900">No recipes found</h3>
              <p className="mt-2 text-sm text-slate-600">
                Try another ingredient like <em>egg</em>, <em>rice</em>, or <em>tomato</em>.
              </p>
            </div>
          )}

          {isError && (
            <div className="card mx-auto mt-6 max-w-2xl border-red-200 bg-red-50 p-8 text-center text-red-700">
              Network error. Please retry.
            </div>
          )}
        </div>

        {/* DRAWER / MODAL */}
        <RecipeDrawer
          id={openId}
          open={!!openId}
          onClose={() => setOpenId(null)}
          onAddFav={(m) => {
            import("../store/useUserStore").then(({ useUserStore }) =>
              useUserStore.getState().addFavourite(m)
            );
          }}
          onAddItems={(m) => {
            import("../store/useUserStore").then(({ useUserStore }) =>
              useUserStore.getState().addItems(m)
            );
          }}
        />
      </div>
    </div>
  );
}
