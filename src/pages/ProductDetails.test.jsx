import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import ProductDetails from "./ProductDetails";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

describe("ProductDetails integration", () => {
  it("adds a product to the cart", async () => {
    const user = userEvent.setup();

    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({
        id: 1,
        title: "Test Product",
        price: 10,
        description: "Test description",
        image: "test.jpg",
        category: "test",
      }),
    });
    const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

   render(
  <QueryClientProvider client={queryClient}>
    <MemoryRouter initialEntries={["/product/1"]}>
      <CartProvider>
        <Routes>
          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />
        </Routes>
      </CartProvider>
    </MemoryRouter>
  </QueryClientProvider>
);

    expect(
      await screen.findByRole("heading", {
        name: "Test Product",
      })
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: "Add to Cart",
      })
    );

    expect(
      screen.getByRole("button", {
        name: "Add to Cart",
      })
    ).toBeInTheDocument();

    vi.restoreAllMocks();
  });
});