import { describe, it, expect } from "vitest";
import { cartReducer, initialCartState } from "../cart-reducer";
import type { Product } from "../../types/types";

const demoProduct: Product = {
  id: "p1",
  name: "Jabłko",
  description: "Świeże jabłko",
  price: 200, // 2.00 PLN
  imageUrl: "/apple.jpg",
  rating: 4.5,
  tags: ["owoce"],
};

describe("cartReducer", () => {
  it("dodaje nowy produkt do koszyka", () => {
    const state = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      payload: { product: demoProduct, quantity: 2 },
    });
    expect(state.items["p1"].quantity).toBe(2);
  });

  it("sumuje ilość gdy produkt już istnieje", () => {
    const state1 = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      payload: { product: demoProduct, quantity: 1 },
    });
    const state2 = cartReducer(state1, {
      type: "ADD_ITEM",
      payload: { product: demoProduct, quantity: 3 },
    });
    expect(state2.items["p1"].quantity).toBe(4);
  });

  it("ustawia ilość przez SET_QUANTITY", () => {
    const state1 = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      payload: { product: demoProduct, quantity: 5 },
    });
    const state2 = cartReducer(state1, {
      type: "SET_QUANTITY",
      payload: { productId: "p1", quantity: 7 },
    });
    expect(state2.items["p1"].quantity).toBe(7);
  });

  it("usuwa produkt przez REMOVE_ITEM", () => {
    const state1 = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      payload: { product: demoProduct, quantity: 1 },
    });
    const state2 = cartReducer(state1, {
      type: "REMOVE_ITEM",
      payload: { productId: "p1" },
    });
    expect(state2.items["p1"]).toBeUndefined();
  });

  it("czyści koszyk przez CLEAR", () => {
    const state1 = cartReducer(initialCartState, {
      type: "ADD_ITEM",
      payload: { product: demoProduct, quantity: 1 },
    });
    const state2 = cartReducer(state1, { type: "CLEAR" });
    expect(Object.keys(state2.items)).toHaveLength(0);
  });
});
