import { useProducts } from "../hooks/useProducts";
import FiltersBar from "../components/FiltersBar/FiltersBar";
import ProductGrid from "../components/ProductGrid/ProductGrid";
import Loader from "../components/Loader/Loader";
import type { Product } from "../types/Product";
import { useCallback } from "react";

export default function Home() {
  const { loading, products, filters, setFilters } = useProducts();

  const handleAdd = useCallback((p: Product) => {
    // Dzień 2: podłączymy CartContext (Reducer + persist)
    // Na razie tylko log:
    console.log("ADD TO CART:", p.id, p.title);
    alert(`Dodano do koszyka: ${p.title}`);
  }, []);

  return (
    <main>
      <FiltersBar value={filters} onChange={setFilters} />
      {loading ? <Loader /> : <ProductGrid items={products} onAdd={handleAdd} />}
    </main>
  );
}
