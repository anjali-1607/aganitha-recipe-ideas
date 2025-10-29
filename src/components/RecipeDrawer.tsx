import { useEffect } from "react";
import { createPortal } from "react-dom";
import { useQuery } from "@tanstack/react-query";
import { getMeal } from "../api/meals";
import { useToast } from "./Toaster"; // ← NEW

function extractIngredients(m: any) {
  const arr: { name: string; qty?: string }[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = m[`strIngredient${i}`];
    const qty = m[`strMeasure${i}`];
    if (ing) arr.push({ name: ing, qty });
  }
  return arr;
}

type Props = {
  id: string | null;
  open: boolean;
  onClose: () => void;
  onAddFav: (m: any) => void;
  onAddItems: (m: any) => void;
};

export default function RecipeDrawer({ id, open, onClose, onAddFav, onAddItems }: Props) {
  const toast = useToast(); // ← NEW

  const { data: meal, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: () => getMeal(id!),
    enabled: open && !!id,
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby="recipe-title">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-start justify-center p-3 sm:p-6" onClick={(e) => e.stopPropagation()}>
        <div className="relative h-full w-full max-w-5xl overflow-hidden rounded-none bg-white shadow-2xl sm:rounded-2xl">
          {/* Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur sm:px-6">
            <div className="min-w-0">
              <h2 id="recipe-title" className="truncate text-base font-semibold text-slate-900 sm:text-lg">
                {isLoading ? "Loading…" : meal?.strMeal ?? "Recipe"}
              </h2>
              <div className="mt-1 hidden gap-2 sm:flex">
                {meal?.strArea && <span className="badge">{meal.strArea}</span>}
                {meal?.strCategory && <span className="badge">{meal.strCategory}</span>}
              </div>
            </div>

            <div className="flex items-center gap-2">
              {!isLoading && meal && (
                <>
                  <button
                    className="btn btn-outline"
                    onClick={() => {
                      onAddItems(meal);
                      toast.show("Added ingredients to your shopping list");
                    }}
                  >
                    Add to List
                  </button>
                  <button
                    className="btn-primary"
                    onClick={() => {
                      onAddFav(meal);
                      toast.show("Saved to favourites");
                    }}
                  >
                    Save
                  </button>
                </>
              )}
              <button
                className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"
                onClick={onClose}
                aria-label="Close"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="h-full overflow-y-auto overscroll-contain px-4 pb-6 pt-4 sm:px-6">
            {isLoading && (
              <div className="space-y-4">
                <div className="h-56 w-full rounded-xl bg-slate-200 animate-pulse" />
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <div className="h-5 w-40 rounded bg-slate-200 animate-pulse" />
                    <div className="h-4 w-72 rounded bg-slate-200 animate-pulse" />
                    <div className="h-4 w-56 rounded bg-slate-200 animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-5 w-40 rounded bg-slate-200 animate-pulse" />
                    <div className="h-24 w-full rounded bg-slate-200 animate-pulse" />
                  </div>
                </div>
              </div>
            )}

            {!isLoading && meal && (
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="aspect-video w-full object-cover" loading="lazy" />
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
                    {meal.strArea && <span className="badge">{meal.strArea}</span>}
                    {meal.strCategory && <span className="badge">{meal.strCategory}</span>}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-3 text-center sm:text-left">
                    <div className="rounded-lg border border-slate-200 p-3">
                      <div className="text-xs text-slate-500">Difficulty</div>
                      <div className="text-sm font-semibold text-slate-800">Easy</div>
                    </div>
                    <div className="rounded-lg border border-slate-200 p-3">
                      <div className="text-xs text-slate-500">Prep</div>
                      <div className="text-sm font-semibold text-slate-800">15 min</div>
                    </div>
                    <div className="rounded-lg border border-slate-200 p-3">
                      <div className="text-xs text-slate-500">Cook</div>
                      <div className="text-sm font-semibold text-slate-800">30 min</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-slate-900">Ingredients</h3>
                  <ul className="mt-2 max-h-48 space-y-1 overflow-auto rounded-lg border border-slate-100 p-3 pr-4">
                    {extractIngredients(meal).map((it, i) => (
                      <li key={i} className="text-sm text-slate-700">• {it.qty} {it.name}</li>
                    ))}
                  </ul>

                  <h3 className="mt-5 text-base font-semibold text-slate-900">Instructions</h3>
                  <p className="mt-2 whitespace-pre-line rounded-lg border border-slate-100 p-3 text-sm leading-relaxed text-slate-700">
                    {meal.strInstructions}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
