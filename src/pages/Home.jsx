import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

function Home() {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:5174/api/products"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      return response.json();
    },
  });

  if (isLoading) {
    return <h2>Loading products...</h2>;
  }

  if (isError) {
    return <h2>Failed to fetch products</h2>;
  }

  if (products.length === 0) {
    return <h2>No products available.</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            React Retail
          </h1>

          <Link
            to="/cart"
            className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700"
          >
         Go to Cart
        </Link>
        </div>      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
              <img                src={product.image}
                alt={product.title}
                className="w-full h-56 object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-900">
                  {product.title}
                </h3>

            <p className="text-lg font-bold text-gray-900 mt-2">
                  ${product.price}
                </p>
                <p className="text-gray-600 mt-2">
                  {product.description}
             </p>
          </div>
          </Link>
          ))}        </div>
    </main>
    </div>
  );
}

export default Home;