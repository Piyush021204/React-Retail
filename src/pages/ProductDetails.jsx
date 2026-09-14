import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:5174/api/products/${id}`
      );

      if (!response.ok) {
        throw new Error("Product not found");
      }

      return response.json();
    },
  });

  if (isLoading) {
    return <h2>Loading product...</h2>;
  }

  if (isError) {
    return <h2>Product not found</h2>;
  }

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>

            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              {product.title}
            </h1>

            <p className="text-2xl font-bold text-gray-900 mt-4">
              ${product.price}
            </p>

            <p className="text-gray-600 mt-6 leading-relaxed">
              {product.description}
            </p>

            <button
              onClick={() => addToCart(product)}
              className="mt-8 w-full md:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;