import { FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product }) {
  const { name, thumbnail, originalPrice, finalPrice, discoundPrice } = product;

  // Auto-calculate discount percentage if not provided
  const discountPercentage =
    discoundPrice ||
    Math.round(((originalPrice - finalPrice) / originalPrice) * 100);

  return (
    <div className="group w-64 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 border border-gray-100 cursor-pointer relative overflow-hidden">
      
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-md z-10">
          -{discountPercentage}%
        </div>
      )}

      {/* Thumbnail */}
      <div className="w-full h-48 bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden relative">
        <img
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}images/product/${thumbnail}`}
          alt={thumbnail}
          className="object-cover w-full h-full rounded-xl group-hover:scale-110 transition-transform duration-300"
        />

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>

      {/* Name */}
      <h3 className="mt-4 text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-black transition-colors">
        {name}
      </h3>

      {/* Prices */}
      <div className="mt-2 flex items-center gap-3">
        {originalPrice && (
          <span className="text-gray-400 line-through text-sm">
            ${originalPrice}
          </span>
        )}
        <span className="text-green-600 font-bold text-xl">
          ${finalPrice}
        </span>
      </div>

      {/* Add to Cart */}
      <button className="mt-4 w-full flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-medium hover:bg-gray-900 active:scale-95 transition-all duration-300 shadow-md">
        <FaShoppingCart />
        Add to Cart
      </button>
    </div>
  );
}
