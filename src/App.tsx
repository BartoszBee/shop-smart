import { ShoppingCart } from "lucide-react";
import {PRODUCTS} from "../data/products";
import ProductCard from '../components/ProductCard'

const product1 = PRODUCTS[0];

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-blue-600 text-white p-4 shadow">
        <h1 className="text-2xl font-bold">
          ShopSmart{" "}
          <ShoppingCart className="w-6 h-6 text-white inline align-baseline ml-2" />
        </h1>
      </header>
      <main className="p-4 grid grid-cols-4 gap-4">
        <section className="col-span-3 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Produkty</h2>
          <p className="text-gray-600">Tutaj pojawi się lista produktów</p>
        </section>
        <aside className="col-span-1 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Koszyk</h2>
          <p className="text-gray-600">Koszyk jest pusty</p>
        </aside>
      </main>
      <ProductCard product={product1} />
    </div>
  );
}
