import { createContext, useMemo, useReducer } from "react";
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

export function CartProvider({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState?: CartState;
}) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialState ?? initialCartState
  );

  // akcje opakowane w funkcje
  const addItem = (product: Product, quantity = 1) =>
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });

  const setQuantity = (productId: string, quantity: number) =>
    dispatch({ type: "SET_QUANTITY", payload: { productId, quantity } });

  const removeItem = (productId: string) =>
    dispatch({ type: "REMOVE_ITEM", payload: { productId } });

  const clear = () => dispatch({ type: "CLEAR" });

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
    [state, itemsArray, totalQuantity, subtotalGrosze, isEmpty]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
