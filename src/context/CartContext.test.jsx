import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "./CartContext";

describe("CartContext", () => {
  it("increases quantity when the same product is added twice", () => {
    const { result } = renderHook(() => useCart(), {
      wrapper: CartProvider,
  });

    const product = {
      id: 1,
      title: "Test Product",
      price: 10,
    };

    act(() => {
      result.current.addToCart(product);
      result.current.addToCart(product);
    });
      expect(result.current.cart).toHaveLength(1);
       expect(result.current.cart[0].quantity).toBe(2);
  });
});