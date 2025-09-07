import type { ProductQuery } from "../types/types";

type ProductsFiltersProps = {
  value: ProductQuery;
  onChange: (next: ProductQuery) => void;
  availableTags: string[];
  totalVisible: number;
};

export default function ProductsFilters({
  value,
  onChange,
  availableTags,
  totalVisible,
}: ProductsFiltersProps) {
  const set = (partial: Partial<ProductQuery>) =>
    onChange({ ...value, ...partial });

  return (
    <form
      className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 items-end"
      aria-label="Filtry produktów"
    >
      {/* wyszukiwarka */}
      <div className="flex flex-col">
        <label htmlFor="search" className="text-sm font-medium text-gray-700">
          Wyszukaj
        </label>
        <input
          type="search"
          id="search"
          placeholder="Nazwa, opis lub tag..."
          className="mt-1 rounded border px-3 py-2"
          value={value.search ?? ""}
          onChange={(e) => set({ search: e.currentTarget.value })}
          aria-describedby="search-hint"
        />
        <span id="search-hint" className="sr-only">
          Wpisz minimum jedną literę, aby zawęzić listę produktów
        </span>
      </div>
      {/* Tag */}
      <div className="flex flex-col">
        <label htmlFor="tag" className="text-sm font-medium text-gray-700">
          <select
            id="tag"
            className="mt-1 rounded border px-3 py-2 bg-white"
            value={value.tag ?? ""}
            onChange={(e) => set({ tag: e.currentTarget.value || undefined })}
          >
            <option value="">Wszystkie</option>
            {availableTags.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* Sortowanie */}
      <div className="flex flex-col">
        <label htmlFor="sort" className="text-sm font-medium text-gray-700">
          Sortuj
        </label>
        <select
          id="sort"
          className="mt-1 rounded border px-3 py-2 bg-white"
          value={value.sortBy ?? ""}
          onChange={(e) =>
            set({
              sortBy: (e.currentTarget.value ||
                undefined) as ProductQuery["sortBy"],
            })
          }
        >
          <option value="">Domyślne</option>
          <option value="price-asc">Cena: najniższa</option>
          <option value="price-desc">Cena: najwyższa</option>
          <option value="rating-desc">Ocena: najlepsze</option>
          <option value="name-asc">Nazwa: A→Z</option>
        </select>
      </div>
      {/* Akcje i licznik */}
      <div className="flex gap-2 self-end">
        <span
          className="inline-flex items-center rounded border px-3 py-2 text-sm text-gray-700 bg-gray-50"
          aria-label="polite"
        >
          Widoczne: <strong className="ml-1">{totalVisible}</strong>
        </span>
        <button
          type="button"
          className="rounded px-3 py-2 text-sm border hover:bg-gray-50"
          onClick={() => onChange({})}
          aria-label="Wyczyść wszystkie filtry"
        >
          Wyczyść
        </button>
      </div>
    </form>
  );
}
