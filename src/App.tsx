import { ShoppingCart } from "lucide-react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

import { CartProvider } from "../state/cart-context";
import { useCart } from "../hooks/useCart";

// header
function Header() {
  const { totalQuantity } = useCart();

  return (
    <header className="bg-blue-600 text-white p-4 shadow">
      <div className="mx-auto max-w-6xl flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          ShopSmart{" "}
          <ShoppingCart className="w-6 h-6 text-white inline align-baseline ml-2" />
        </h1>

        <div
          className="inline-flex items-center gap-2 bg-blue-500/60 hover:bg-blue-500 rounded-lg px-3 py-1 text-sm"
          aria-label="Panel koszyka"
        >
          <span>Koszyk</span>
          <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-white/20 text-white text-xs">
            {totalQuantity}
          </span>
        </div>
      </div>
    </header>
  );
}

// product section

function ProductsSection() {
  const { addItem } = useCart();

  return (
    <section className="col-span-3 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Produkty</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {PRODUCTS.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={() => addItem(p, 1)}
          />
        ))}
      </div>
    </section>
  );
}

// cart panel
function CartSidebar() {
  return (
    <aside className="col-span-1 bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Koszyk</h2>
      <p className="text-gray-600">Koszyk jest pusty</p>
    </aside>
  );
}

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Header />
        <main className="pt-4 grid grid-cols-4 gap-4 mx-auto max-w-6xl">
          <ProductsSection />
          <CartSidebar />
        </main>
      </div>
    </CartProvider>
  );
}
