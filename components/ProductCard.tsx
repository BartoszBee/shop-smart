import type { Product } from "../types/types";
import { formatPLN } from "../utils/money";
import { ShoppingCart } from "lucide-react";
import { memo } from "react";

type ProductCardProps = {
  product: Product;
  onAddToCart?: (product: Product) => void;
};

function ProductCardBase({ product, onAddToCart }: ProductCardProps) {
  const { name, description, imageUrl, price, rating } = product;

  return (
    <article className="rounded-xl overflow-hidden border bg-white shadow-sm hover:shadow transition-shadow">
      <img
        src={imageUrl}
        alt={name}
        loading="lazy"
        className="block w-full h-48 object-cover"
      />
      <div className="p-4 space-y-3">
        <header className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-lg leading-snug">{name}</h3>
          {typeof rating === "number" && (
            <span
              className="inline-flex items-center rounded-full px-2 py-0.5 text-sm bg-amber-100 text-amber-800 min-w-[50px]"
              aria-label={`Ocena ${rating} na 5`}
              title={`Ocena ${rating} na 5`}
            >
              ★ {rating?.toFixed(1)}
            </span>
          )}
        </header>
        <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <strong className="text-lg">{formatPLN(price)}</strong>
          <button
            type="button"
            onClick={() => {
              onAddToCart?.(product);
              const live = document.getElementById("live-region");
              if (live) live.textContent = `Dodano do koszyka: ${name}`;
            }}
            aria-label={`Dodaj do koszyka: ${name}`}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <ShoppingCart />
            <span>Dodaj</span>
          </button>
        </div>
      </div>
    </article>
  );
}

const ProductCard = memo(
  ProductCardBase,
  (prev, next) =>
    prev.product === next.product && prev.onAddToCart === next.onAddToCart
);

export default ProductCard;
