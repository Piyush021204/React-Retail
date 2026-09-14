import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
  cart,
  removeFromCart,
  updateQuantity,
  itemCount,
  subtotal,
} = useCart();

  if (cart.length === 0) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>

        <Link to="/">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-50">
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Your Cart
      </h1>

      <div className="space-y-5">
        {cart.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col md:flex-row gap-5 md:items-center"
          >
            <img
              src={item.image}
          alt={item.title}
              className="w-full md:w-32 h-32 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900">
               {item.title}
           </h2>

          <p className="text-gray-600 mt-1">
                Price: ${item.price}
            </p>
              <p className="font-medium text-gray-900 mt-2">
              Quantity: {item.quantity}
              </p>

             <div className="flex items-center gap-2 mt-3">
               <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                className="w-9 h-9 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-40"
                >
                  -
              </button>
                <span className="w-8 text-center">
                 {item.quantity}
                </span>
                <button
                onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                 }
                  className="w-9 h-9 border border-gray-300 rounded-lg hover:bg-gray-100"
            >
                  +
           </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                 className="ml-3 px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
              >
                  Remove                </button>
              </div>
            </div>

            <p className="text-xl font-bold text-gray-900">
          ${(item.price * item.quantity).toFixed(2)}
            </p>
        </div>
      ))}
      </div>
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
  <p className="text-gray-700">
    Total Items: {itemCount}
  </p>

  <p className="text-xl font-bold text-gray-900 mt-2">
    Subtotal: ${subtotal.toFixed(2)}
  </p>
</div>

      <div className="mt-8 flex justify-end">
        
        
        <Link
          to="/checkout"
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </main>
  </div>
);
}

export default Cart;