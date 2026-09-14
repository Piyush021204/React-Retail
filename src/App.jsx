import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import OrderConfirmation from "./pages/OrderConfirmation";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route
              path="/order-confirmation"
              element={<OrderConfirmation />}
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;