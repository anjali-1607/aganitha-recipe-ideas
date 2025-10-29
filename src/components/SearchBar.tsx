import { useState } from "react";

export default function SearchBar({
  onSearch,
  onChipClick,
}: {
  onSearch: (q: string, mode: "ingredient" | "name") => void;
  onChipClick?: (q: string) => void;
}) {
  const [q, setQ] = useState("");
  const [mode, setMode] = useState<"ingredient" | "name">("ingredient");

  const chips = ["chicken", "paneer", "noodles", "dal", "fish"];

  return (
    <div className="mx-auto w-full max-w-3xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSearch(q.trim(), mode);
        }}
        className="glass flex flex-col gap-3 rounded-2xl px-3 py-3 shadow-md sm:flex-row sm:items-center sm:px-4"
      >
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={mode === "ingredient" ? "Search by ingredient (e.g., chicken, rice)" : "Search by dish name"}
          className="input flex-1 border-0 bg-transparent focus:ring-0"
        />
        <div className="flex gap-2">
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as any)}
            className="select"
          >
            <option value="ingredient">By Ingredient</option>
            <option value="name">By Name</option>
          </select>
          <button className="btn-primary">Search</button>
        </div>
      </form>

      {/* Quick chips */}
      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-sm">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => {
              setQ(c);
              onChipClick?.(c);
              onSearch(c, mode);
            }}
            className="rounded-full border border-slate-200 px-3 py-1 text-slate-700 hover:bg-slate-50"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
