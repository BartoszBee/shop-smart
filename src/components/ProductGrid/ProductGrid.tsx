import styles from "./ProductGrid.module.css";
import ProductCard from "../ProductCard/ProductCard";
import type { Product } from "../../types/Product";

type Props = {
  items: Product[];
  onAdd: (p: Product) => void;
};

export default function ProductGrid({ items, onAdd }: Props) {
  if (items.length === 0) {
    return <p className={styles.empty}>Brak wyników dla wybranych filtrów.</p>;
  }

  return (
    <div className={styles.grid} aria-live="polite">
      {items.map(p => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
