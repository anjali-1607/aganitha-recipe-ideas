export default function Hero({
    onRandom,
  }: {
    onRandom: () => void;
  }) {
    return (
      <section className="relative overflow-hidden">
        {/* Decorative gradient blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -top-16 right-0 h-80 w-80 rounded-full bg-blue-300/20 blur-3xl" />
  
        <div className="container-main py-10 sm:py-14 lg:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Cook smarter, not harder.
            </h1>
            <p className="mt-3 text-base text-slate-600 sm:text-lg">
              Type an ingredient and instantly get beautiful recipe ideas. Save favourites and build a shopping list in one click.
            </p>
  
            <div className="mt-6">
              <button onClick={onRandom} className="btn-primary">
                Surprise me with a random recipe
              </button>
            </div>
  
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-slate-500">
              <span>Popular:</span>
              <ul className="flex flex-wrap items-center gap-2">
                {["chicken", "paneer", "pasta", "egg", "rice", "tomato", "chocolate"].map((k) => (
                  <li key={k} className="rounded-full border border-slate-200 px-3 py-1 hover:bg-slate-50">{k}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
  