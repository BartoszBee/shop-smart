import {
  createContext,
  useMemo,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import type { ReactNode } from "react";
import type { CartState, Product } from "../types/types.ts";

import {
  cartReducer,
  initialCartState,
  selectItemsArray,
  selectSubtotalGrosze,
  selectTotalQuantity,
  selectIsEmpty,
} from "./cart-reducer.ts";

export type CartContextValue = {
  state: CartState;
  // akcje
  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
  // pochodne
  itemsArray: ReturnType<typeof selectItemsArray>;
  totalQuantity: number;
  subtotalGrosze: number;
  isEmpty: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext<CartContextValue | null>(null);

// klucz localStorage
const STORAGE_KEY = "shopsmart-cart";

// ładowanie koszyka z localStorage
function loadFromStorage(): CartState {
  if (typeof window === "undefined") return initialCartState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialCartState;
    const parsed = JSON.parse(raw) as CartState;
    if (parsed && typeof parsed === "object" && parsed.items) {
      return parsed;
    }
    return initialCartState;
  } catch {
    return initialCartState;
  }
}

export function CartProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: CartState;
}) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState ?? loadFromStorage()
  );

  // zapis do localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      //ignorujemy błąd po prostu zapis się nie uda
    }
  }, [state]);

  // akcje opakowane w funkcje
  const addItem = useCallback(
    (product: Product, quantity = 1) =>
      dispatch({ type: "ADD_ITEM", payload: { product, quantity } }),
    []
  );

  const setQuantity = useCallback(
    (productId: string, quantity: number) =>
      dispatch({ type: "SET_QUANTITY", payload: { productId, quantity } }),
    []
  );

  const removeItem = useCallback(
    (productId: string) =>
      dispatch({ type: "REMOVE_ITEM", payload: { productId } }),
    []
  );

  const clear = useCallback(() => dispatch({ type: "CLEAR" }), []);

  // pochodne wartości z selectorów - memozacja, nie renderować niepotrzebnie
  const itemsArray = useMemo(() => selectItemsArray(state), [state]);
  const totalQuantity = useMemo(() => selectTotalQuantity(state), [state]);
  const subtotalGrosze = useMemo(() => selectSubtotalGrosze(state), [state]);
  const isEmpty = useMemo(() => selectIsEmpty(state), [state]);

  const value: CartContextValue = useMemo(
    () => ({
      state,
      addItem,
      setQuantity,
      removeItem,
      clear,
      itemsArray,
      totalQuantity,
      subtotalGrosze,
      isEmpty,
    }),
    [
      state,
      addItem,
      setQuantity,
      removeItem,
      clear,
      itemsArray,
      totalQuantity,
      subtotalGrosze,
      isEmpty,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
