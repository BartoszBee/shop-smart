import type { CartAction, CartItem, CartState, Product } from "../types/types";

export const initialCartState: CartState = {
    items: {}
}

// bezpieczne dodawanie sztuk < 1 i nadmierne ilości
function normalizeQuantity(q: number | undefined, fallback = 1) {
    const n = Math.floor(Number.isFinite(q as number) ? (q as number) : fallback);
    return Math.max(1, Math.min(999, n));
}

function addItem(state: CartState, product: Product, quantity = 1): CartState {
    const qty = normalizeQuantity(quantity, 1);
    const existing = state.items[product.id];

    const nextItem: CartItem = existing ? { product, quantity: existing.quantity + qty } : { product, quantity: qty }

    return { ...state, items: { ...state.items, [product.id]: nextItem } }
}

function setQuantity(state: CartState, productId: string, quantity: number): CartState {
    const qty = normalizeQuantity(quantity, 1);
    if (!state.items[productId]) return state;

    return {
        ...state, items: { ...state.items, [productId]: { ...state.items[productId], quantity: qty } }
    }
}

function removeItem(state: CartState, productId: string): CartState {
    if (!state.items[productId]) return state;
    const { [productId]: _omit, ...rest } = state.items;
    return { ...state, items: rest }
}

function clear(state: CartState): CartState {
    if (Object.keys(state.items).length === 0) return state;
    return { ...state, items: {} };
}


