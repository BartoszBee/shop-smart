import { useEffect, useMemo, useState } from "react";
import type { Product } from "../types/Product";
import raw from "../data/products.json";
import { useDebouncedValue } from "./useDebouncedValue";

type SortKey = "relevance" | "price_asc" | "price_desc" | "rating_desc";
export type Filters = {
  q: string;
  category: "all" | "electronics" | "home" | "sport";
  sort: SortKey;
};

const DEFAULT: Filters = { q: "", category: "all", sort: "relevance" };

export function useProducts(initial: Partial<Filters> = {}) {
  const [filters, setFilters] = useState<Filters>({ ...DEFAULT, ...initial });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // symulacja fetch: tutaj czytamy lokalny JSON (w Dniu 2/3 podmienimy na API)
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setProducts(raw as Product[]);
      setLoading(false);
    }, 250); // mały delay, aby zobaczyć loader
    return () => clearTimeout(timer);
  }, []);

  const debouncedQ = useDebouncedValue(filters.q, 250);

  const result = useMemo(() => {
    let list = [...products];

    // filtr kategorii
    if (filters.category !== "all") {
      list = list.filter(p => p.category === filters.category);
    }

    // tekst (prostą relewancję liczymy wagą dopasowania)
    const q = debouncedQ.trim().toLowerCase();
    if (q) {
      list = list
        .map(p => {
          const title = p.title.toLowerCase();
          const idx = title.indexOf(q);
          const score = idx === -1 ? 0 : 100 - idx; // im wcześniej, tym lepiej
          return { p, score };
        })
        .filter(x => x.score > 0)
        .sort((a, b) => b.score - a.score)
        .map(x => x.p);
    }

    // sort
    switch (filters.sort) {
      case "price_asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating_desc":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "relevance":
      default:
        // jeśli nie ma q, zostawiamy input order z JSON (można też sortować po id)
        break;
    }

    return list;
  }, [products, filters.category, filters.sort, debouncedQ]);

  return {
    loading,
    filters,
    setFilters,
    products: result
  };
}
