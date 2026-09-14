import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div>
        <h1>Order Confirmation</h1>
        <p>No order information found.</p>

        <Link to="/">
          Continue Shopping
        </Link>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
    <div className="w-full max-w-lg bg-white rounded-2xl border border-gray-200 p-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900">
        Order Confirmed!
      </h1>

      <p className="text-gray-600 mt-3">
        Thank you for your order.
      </p>

      <div className="mt-6 space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold">Order ID:</span>{" "}
          {order.id}
        </p>

        <p className="text-gray-700">
          <span className="font-semibold">Status:</span>{" "}
          {order.status}
        </p>
      </div>

      <Link
        to="/"
        className="inline-block mt-8 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700"
      >
        Continue Shopping
      </Link>
    </div>
  </div>
);
}

export default OrderConfirmation;