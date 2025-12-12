import { api } from "@shared/api/axios";
import { formatCurrency } from "@shared/lib/normalize";
import type { Page } from "@shared/types/page";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface ProductListItem {
  id: number;
  productName: string;
  amount: number;
  price: number;
  imageUrl: string;
  categoryName: string[];
}

const ProductListView = () => {
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.get<Page<ProductListItem>>("/api/products");
        setProducts(res.data.content);
        console.log("Products loaded:", res.data.content);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#232629] flex text-[#dcdcdc]">
      <div className="flex-1 overflow-hidden">
        <div className="bg-[#3b3f41]/30 backdrop-blur-sm border-b border-[#4d4d4d] px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#dcdcdc] flex items-center">
                Product Inventory
              </h1>
              <p className="text-[#90999a] mt-1 text-sm">
                {" "}
                Manage and track all products in your system
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search SKU or Name..."
                  className="bg-[#2d2d2d] border border-[#4d4d4d] rounded-xl px-4 py-2 pl-10 text-[#dcdcdc] focus:outline-none focus:ring-2 focus:ring-[#f48024] placeholder:text-[#6a6a6a] w-64" // Tăng chiều rộng
                />
                <svg
                  className="w-4 h-4 text-[#90999a] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <Link
                to="/create-products"
                className="bg-[#f48024] cursor-pointer hover:bg-[#e06a00] text-white px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105 flex items-center shadow-md hover:shadow-lg" // Thêm shadow
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                New Product
              </Link>
            </div>
          </div>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100vh-97px)] custom-scrollbar">
          {" "}
          <div className="bg-[#3b3f41]/60 backdrop-blur-sm border border-[#4d4d4d] rounded-2xl overflow-hidden shadow-md">
            {" "}
            <div className="px-6 py-4 border-b border-[#4d4d4d]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#e1e1e1]">
                  Product Catalog
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    title="Filter"
                    className="text-[#b0b9ba] hover:text-[#f48024] p-2 rounded-lg hover:bg-[#2d2d2d] transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </button>
                  <button
                    title="Export"
                    className="text-[#b0b9ba] hover:text-[#f48024] p-2 rounded-lg hover:bg-[#2d2d2d] transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center py-10 text-[#a0a9aa]">
                  Loading products...
                </div>
              ) : error ? (
                <div className="text-center py-10 text-red-400">{error}</div>
              ) : products.length === 0 ? (
                <div className="text-center py-10 text-[#a0a9aa]">
                  No products found.
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-[#2d2d2d]/50">
                    {" "}
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#a0a9aa] uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-[#a0a9aa] uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-[#a0a9aa] uppercase tracking-wider">
                        Stock
                      </th>{" "}
                      <th className="px-6 py-3 text-right text-xs font-semibold text-[#a0a9aa] uppercase tracking-wider">
                        Price
                      </th>{" "}
                      <th className="px-6 py-3 text-center text-xs font-semibold text-[#a0a9aa] uppercase tracking-wider">
                        Status
                      </th>{" "}
                      <th className="px-6 py-3 text-center text-xs font-semibold text-[#a0a9aa] uppercase tracking-wider">
                        Actions
                      </th>{" "}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#4d4d4d]/50">
                    {" "}
                    {products.map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-[#2d2d2d]/40 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {" "}
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-lg border border-[#4d4d4d] bg-[#2d2d2d]/50 flex items-center justify-center text-[#6a6a6a]">
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-[#e1e1e1]">
                                {p.productName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#b0b9ba]">
                          {p.categoryName.join(", ")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#e1e1e1] text-right font-medium">
                          {" "}
                          {p.amount}
                        </td>
                        {/* Price */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#e1e1e1] text-right font-medium">
                          {" "}
                          {formatCurrency(p.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                              p.amount > 10
                                ? "bg-green-500/20 text-green-300 border-green-500/30"
                                : p.amount > 0
                                ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                : "bg-red-500/20 text-red-300 border-red-500/30"
                            }`}
                          >
                            {p.amount > 10
                              ? "In Stock"
                              : p.amount > 0
                              ? "Low Stock"
                              : "Out of Stock"}
                          </span>
                        </td>
                        {/* Actions */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                          {" "}
                          {/* Căn giữa */}
                          <div className="flex items-center justify-center space-x-2">
                            {" "}
                            {/* justify-center */}
                            <button
                              title="Edit"
                              className="text-[#f48024] hover:text-[#ff9a4c] p-1 rounded transition-colors duration-150 transform hover:scale-110"
                            >
                              {" "}
                              {/* Màu hover sáng hơn, scale */}
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                />
                              </svg>
                            </button>
                            <button
                              title="View Details"
                              className="text-[#b0b9ba] hover:text-[#e1e1e1] p-1 rounded transition-colors duration-150 transform hover:scale-110"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            </button>
                            <button
                              title="Delete"
                              className="text-[#b0b9ba] hover:text-red-400 p-1 rounded transition-colors duration-150 transform hover:scale-110"
                            >
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {!isLoading && !error && products.length > 0 && (
              <div className="px-6 py-3 border-t border-[#4d4d4d]/50 flex items-center justify-between text-sm text-[#a0a9aa]">
                <div>
                  Showing 1 to {products.length} of {products.length} results
                </div>{" "}
                <div className="flex space-x-1">
                  <button className="px-3 py-1 rounded border border-[#4d4d4d] hover:bg-[#2d2d2d]">
                    Previous
                  </button>
                  <button className="px-3 py-1 rounded border border-[#4d4d4d] hover:bg-[#2d2d2d]">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
