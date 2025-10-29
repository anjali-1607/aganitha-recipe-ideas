import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import RecipeCard from "../components/RecipeCard";
import RecipeDrawer from "../components/RecipeDrawer";

export default function Favourites() {
  // 👇 define state here before using it
  const [openId, setOpenId] = useState<string | null>(null);

  // 👇 use Zustand store with quick any typing
  const favs = useUserStore((s: any) => s.favourites);
  const remove = useUserStore((s: any) => s.removeFavourite);

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-semibold">Saved Favourites</h1>

      {favs.length === 0 && (
        <div className="card p-8 text-center text-slate-600">No favourites yet.</div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {favs.map((m: any) => (
          <div key={m.idMeal} className="relative">
            <RecipeCard meal={m} onOpen={setOpenId} />
            <button
              onClick={() => remove(m.idMeal)}
              className="absolute right-2 top-2 rounded-md bg-white/90 px-2 py-1 text-xs shadow"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <RecipeDrawer
        id={openId}
        open={!!openId}
        onClose={() => setOpenId(null)}
        onAddFav={() => {}}
        onAddItems={(m) => useUserStore.getState().addItems(m)}
      />
    </div>
  );
}
