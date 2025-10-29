export default function RecipeCard({
    meal,
    onOpen,
  }: {
    meal: any;
    onOpen: (id: string) => void;
  }) {
    return (
      <button
        onClick={() => onOpen(meal.idMeal)}
        className="card card-hover group relative overflow-hidden text-left"
      >
        <div className="relative">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="h-56 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
          <h3 className="pointer-events-none absolute bottom-2 left-3 max-w-[85%] truncate text-base font-semibold text-white drop-shadow">
            {meal.strMeal}
          </h3>
        </div>
        <div className="p-3">
          <div className="mt-1 flex flex-wrap gap-2">
            {meal.strArea && <span className="badge">{meal.strArea}</span>}
            {meal.strCategory && <span className="badge">{meal.strCategory}</span>}
          </div>
        </div>
      </button>
    );
  }
  