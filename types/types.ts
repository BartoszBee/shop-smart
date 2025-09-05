// product
export type Product = {
    id: string;
    name: string;
    description: string;
    price: number; // będę trzymał w groszach
    imageUrl: string;
    tags?: string[];
    rating?: number;
}

// pozycja w koszyku
export type CartItem = {
    product: Product;
    quantity: number;
}

// akcje reducer
export type CartAction =
    | { type: "ADD_ITEM", payload: { product: Product; quantity?: number } }
    | { type: "REMOVE_ITEM", payload: { productId: Product['id'] } }
    | { type: "SET_QUANTITY", payload: { productId: Product['id']; quantity: number } }
    | { type: "CLEAR" };

// stan koszyka
export type CartState = {
    items: Record<string, CartItem>;
}

// filtrowanie
export type ProductQuery = {
    search?: string;
    tag?: string;
    sortBy?: "price-asc" | "price-desc" | "rating-desc" | "name-asc";
}

