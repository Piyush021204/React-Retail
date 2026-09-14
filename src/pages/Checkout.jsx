import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart } = useCart();
  console.log("Checkout cart:", cart);
  const navigate = useNavigate();
  const placeOrderMutation = useMutation({
  mutationFn: async (orderData) => {
    const response = await fetch(
      "http://localhost:5174/api/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to place order");
    }

    return response.json();
  },

  onSuccess: (order) => {
    navigate("/order-confirmation", {
      state: { order },
    });
  },
});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = (event) => {
  event.preventDefault();

  placeOrderMutation.mutate({
    items: cart,
    customer: {
      name,
      email,
      address,
    },
  });
};

 return (
  <div className="min-h-screen bg-gray-50">
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b border-gray-100 pb-4"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {item.title}
                  </p>

             <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
              </p>
              </div>

                <p className="font-medium text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
                </p>
            </div>
            ))}
          </div>

        <div className="flex justify-between mt-6 pt-4 border-t border-gray-200">
            <span className="text-lg font-semibold">
             Total
            </span>

          <span className="text-lg font-bold">
              ${total.toFixed(2)}
        </span>
          </div>
        </div>

     <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
        Customer Information
          </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
           Name
              </label>

             <input
                type="text"            value={name}
                onChange={(event) => setName(event.target.value)}
            required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>

        <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
               Email
              </label>

          <input
                type="email"
              value={email}
             onChange={(event) => setEmail(event.target.value)}
                required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
        </div>

            <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>

             <input
                type="text"
                value={address}
            onChange={(event) => setAddress(event.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
           </div>

            {placeOrderMutation.isError && (
  <p className="text-red-600 text-sm">
    {placeOrderMutation.error.message}
  </p>
)}

            <button
              type="submit"
              disabled={placeOrderMutation.isPending}
          className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700 disabled:opacity-50"
            >
              {placeOrderMutation.isPending
  ? "Placing Order..."
  : "Place Order"}
            </button>
          </form>
        </div>
      </div>
    </main>
  </div>
);
}

export default Checkout;