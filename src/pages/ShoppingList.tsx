import { useUserStore, type ListItem, type UserStore } from "../store/useUserStore";

export default function ShoppingList() {
  // Explicitly type the selector param to silence "implicitly any"
  const list = useUserStore((s: UserStore) => s.list);
  const clear = useUserStore((s: UserStore) => s.clearList);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Shopping List</h1>
        <button className="btn btn-outline" onClick={clear}>
          Clear
        </button>
      </div>

      {list.length === 0 && (
        <div className="card p-8 text-center text-slate-600">Your list is empty.</div>
      )}

      <ul className="card divide-y divide-slate-100">
        {list.map((it: ListItem, i: number) => (
          <li key={i} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm text-slate-800">{it.name}</span>
            <span className="text-xs text-slate-500">{it.qty}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
