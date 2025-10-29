import { create } from "zustand";

export type Meal = Record<string, any> & { idMeal: string };
export type ListItem = { name: string; qty?: string };

export interface UserStore {
  favourites: Meal[];
  list: ListItem[];
  addFavourite: (m: Meal) => void;
  removeFavourite: (id: string) => void;
  addItems: (m: Meal) => void;
  clearList: () => void;
}

function safeLoad<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export const useUserStore = create<UserStore>((set, get) => ({
  favourites: safeLoad<Meal[]>("favs", []),
  list: safeLoad<ListItem[]>("list", []),

  addFavourite: (m) => {
    const next = [...get().favourites.filter((x) => x.idMeal !== m.idMeal), m];
    localStorage.setItem("favs", JSON.stringify(next));
    set({ favourites: next });
  },

  removeFavourite: (id) => {
    const next = get().favourites.filter((x) => x.idMeal !== id);
    localStorage.setItem("favs", JSON.stringify(next));
    set({ favourites: next });
  },

  addItems: (m) => {
    const items: ListItem[] = [];
    for (let i = 1; i <= 20; i++) {
      const ing = m[`strIngredient${i}`];
      const qty = m[`strMeasure${i}`];
      if (ing) items.push({ name: ing, qty });
    }
    const dedup = new Map<string, ListItem>();
    [...get().list, ...items].forEach((it) => dedup.set(it.name.toLowerCase(), it));
    const next = [...dedup.values()];
    localStorage.setItem("list", JSON.stringify(next));
    set({ list: next });
  },

  clearList: () => {
    localStorage.setItem("list", "[]");
    set({ list: [] });
  },
}));
