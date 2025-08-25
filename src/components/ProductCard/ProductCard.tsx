import styles from "./ProductCard.module.css";
import type { Product } from "../../types/Product";

type Props = {
  product: Product;
  onAdd?: (p: Product) => void;
};

export default function ProductCard({ product, onAdd }: Props) {
  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.meta}>
          <span className={styles.cat}>{product.category}</span>
          <span className={styles.rating} aria-label="rating">★ {product.rating.toFixed(1)}</span>
        </div>
        <div className={styles.footer}>
          <span className={styles.price}>{product.price.toFixed(2)} zł</span>
          <button
            className={styles.btn}
            type="button"
            onClick={() => onAdd?.(product)}
            aria-label="add-to-cart"
          >
            Dodaj
          </button>
        </div>
      </div>
    </article>
  );
}
