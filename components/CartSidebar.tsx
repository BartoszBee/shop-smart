import { useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { formatPLN } from "../utils/money";

export default function CartSidebar() {
  const {
    itemsArray,
    subtotalGrosze,
    isEmpty,
    setQuantity,
    removeItem,
    clear,
  } = useCart();

  // Lokalne drafty ilości dla inputów
  const [qtyDraft, setQtyDraft] = useState<Record<string, string>>({});

  const handleBlur = (productId: string) => {
    const raw = qtyDraft[productId];
    const parsed = Math.max(1, Math.min(999, Number(raw) || 1));
    setQuantity(productId, parsed);
    setQtyDraft((d) => ({ ...d, [productId]: String(parsed) }));
  };

  return (
    <aside
      className="col-span-4 lg:col-span-1 bg-white p-4 rounded shadow h-fit"
      role="complementary"
      aria-labelledby="cart-heading"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold" id="cart-heading">
          Koszyk
        </h2>
        {!isEmpty && (
          <button
            type="button"
            onClick={clear}
            className="text-sm text-red-600 hover:text-red-700 underline"
            aria-label="Wyczyść koszyk"
          >
            Wyczyść
          </button>
        )}
      </div>

      {isEmpty ? (
        <p className="text-gray-600">Koszyk jest pusty</p>
      ) : (
        <>
          <ul className="divide-y">
            {itemsArray.map(({ product, quantity }) => {
              const v = qtyDraft[product.id] ?? String(quantity);
              const atMin = quantity <= 1;
              const atMax = quantity >= 999;

              return (
                <li key={product.id} className="py-3 flex items-start gap-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-14 h-14 rounded object-cover flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p
                          className="font-medium truncate"
                          title={product.name}
                        >
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {formatPLN(product.price)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                        aria-label={`Usuń ${product.name} z koszyka`}
                        title="Usuń"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        disabled={atMin}
                        aria-disabled={atMin}
                        className="inline-flex items-center justify-center w-8 h-8 rounded border hover:bg-gray-50"
                        onClick={() =>
                          setQuantity(product.id, Math.max(1, quantity - 1))
                        }
                        aria-label={`Zmniejsz ilość dla ${product.name}`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <label htmlFor={`qty-${product.id}`} className="sr-only">
                        Ilość dla {product.name}
                      </label>
                      <input
                        id={`qty-${product.id}`} // ✅ unikalne id na podstawie product.id
                        inputMode="numeric"
                        pattern="[0-9]*"
                        className="w-14 text-center rounded border px-2 py-1"
                        aria-describedby={`qty-help-${product.id}`}
                        value={v}
                        onChange={(e) =>
                          setQtyDraft((d) => ({
                            ...d,
                            [product.id]: e.target.value,
                          }))
                        }
                        onBlur={() => handleBlur(product.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.currentTarget.blur();
                          }
                        }}
                      />
                      <span id={`qty-help-${product.id}`} className="sr-only">
                        Wpisz liczbę od 1 do 999
                      </span>

                      <button
                        type="button"
                        disabled={atMax}
                        aria-disabled={atMax}
                        className="inline-flex items-center justify-center w-8 h-8 rounded border hover:bg-gray-50"
                        onClick={() =>
                          setQuantity(product.id, Math.min(999, quantity + 1))
                        }
                        aria-label={`Zwiększ ilość dla ${product.name}`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>

                      <span className="ml-auto text-sm text-gray-700">
                        Razem:{" "}
                        <strong className="font-semibold">
                          {formatPLN(product.price * quantity)}
                        </strong>
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-4 border-t pt-4 flex items-center justify-between">
            <span className="text-gray-600">Suma</span>
            <span className="text-lg font-semibold">
              {formatPLN(subtotalGrosze)}
            </span>
          </div>
        </>
      )}
    </aside>
  );
}
