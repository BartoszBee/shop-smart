import styles from "./FiltersBar.module.css";
import type { Filters } from "../../hooks/useProducts";

type Props = {
  value: Filters;
  onChange: (next: Filters) => void;
};

export default function FiltersBar({ value, onChange }: Props) {
  return (
    <section className={styles.wrap}>
      <input
        className={styles.search}
        placeholder="Szukaj produktów…"
        value={value.q}
        onChange={(e) => onChange({ ...value, q: e.target.value })}
        aria-label="search"
      />

      <select
        className={styles.select}
        value={value.category}
        onChange={(e) => onChange({ ...value, category: e.target.value as Filters["category"] })}
        aria-label="category"
      >
        <option value="all">Wszystkie kategorie</option>
        <option value="electronics">Electronics</option>
        <option value="home">Home</option>
        <option value="sport">Sport</option>
      </select>

      <select
        className={styles.select}
        value={value.sort}
        onChange={(e) => onChange({ ...value, sort: e.target.value as Filters["sort"] })}
        aria-label="sort"
      >
        <option value="relevance">Trafność</option>
        <option value="price_asc">Cena ↑</option>
        <option value="price_desc">Cena ↓</option>
        <option value="rating_desc">Ocena ↓</option>
      </select>
    </section>
  );
}
