import React, { createContext, useContext, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Toast = { id: number; message: string; type?: "success" | "info" | "error" };
type ToastCtx = { show: (message: string, type?: Toast["type"]) => void };

const ToastContext = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const show = (message: string, type: Toast["type"] = "success") => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, message, type }]);
    // auto-dismiss after 2s
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2000);
  };

  const value = useMemo(() => ({ show }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-full max-w-sm flex-col gap-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={
                "pointer-events-auto rounded-xl border px-4 py-3 shadow-sm " +
                (t.type === "error"
                  ? "border-red-200 bg-red-50 text-red-700"
                  : t.type === "info"
                  ? "border-slate-200 bg-white text-slate-700"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700")
              }
              role="status"
              aria-live="polite"
            >
              {t.message}
            </div>
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider>");
  return ctx;
}
