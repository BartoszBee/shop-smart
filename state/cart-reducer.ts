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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [productId]: _omit, ...rest } = state.items;
    return { ...state, items: rest }
}

function clear(state: CartState): CartState {
    if (Object.keys(state.items).length === 0) return state;
    return { ...state, items: {} };
}


// reducer

export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case "ADD_ITEM":
            return addItem(state, action.payload.product, action.payload.quantity ?? 1);

        case "SET_QUANTITY":
            return setQuantity(state, action.payload.productId, action.payload.quantity);

        case "REMOVE_ITEM":
            return removeItem(state, action.payload.productId);

        case "CLEAR":
            return clear(state);

        default:
            return state;
    }
}

// selectory

export function selectItemsArray(state: CartState): CartItem[] {
    return Object.values(state.items);
}

export function selectTotalQuantity(state: CartState): number {
    return Object.values(state.items).reduce((sum, item) => sum + item.quantity, 0);
}

export function selectSubtotalGrosze(state: CartState): number {
    return Object.values(state.items).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function selectIsEmpty(state: CartState): boolean {
    return Object.keys(state.items).length === 0;
}

export function selectQuantityById(state: CartState, productId: string): number {
    return state.items[productId]?.quantity ?? 0;
}