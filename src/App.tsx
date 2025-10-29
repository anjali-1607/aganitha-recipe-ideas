import { NavLink, Outlet } from "react-router-dom";
import { useUserStore, type UserStore } from "./store/useUserStore";

export default function App() {
  const favCount = useUserStore((s: UserStore) => s.favourites.length);
  const listCount = useUserStore((s: UserStore) => s.list.length);

  const Badge = ({ count }: { count: number }) =>
    count > 0 ? (
      <span className="ml-1 inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-emerald-600 px-1 text-xs font-semibold text-white">
        {count}
      </span>
    ) : null;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="container-main flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight">🍳 Recipe Ideas</span>
            <span className="hidden text-xs text-slate-500 sm:inline">Discover meals by ingredient</span>
          </div>
          <nav className="flex gap-2">
            <NavLink to="/" className={({ isActive }) => `btn btn-outline ${isActive ? "bg-slate-50" : ""}`}>
              Home
            </NavLink>
            <NavLink to="/favourites" className={({ isActive }) => `btn btn-outline ${isActive ? "bg-slate-50" : ""}`}>
              Favourites <Badge count={favCount} />
            </NavLink>
            <NavLink to="/list" className={({ isActive }) => `btn btn-outline ${isActive ? "bg-slate-50" : ""}`}>
              Shopping List <Badge count={listCount} />
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="mt-10 border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        Candidate ID: <strong>Naukri1025</strong>
      </footer>
    </div>
  );
}
