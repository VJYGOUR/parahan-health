import { useCart } from "../context/CartContext";
import { FaHeart, FaStar, FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const originalPrice = Math.round(product.price * 1.2);

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-green-200 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 sm:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge */}
        <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
          BEST SELLER
        </span>

        {/* Wishlist */}
        <button className="absolute top-4 right-4 bg-white p-3 rounded-full shadow hover:bg-green-50 transition">
          <FaHeart className="text-gray-500 hover:text-green-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2">
          {product.name}
        </h2>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-green-600 text-sm" />
          ))}

          <span className="text-sm text-gray-500 ml-2">(245 Reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-black text-green-700">
            ₹{product.price.toLocaleString()}
          </span>

          <span className="text-gray-400 line-through">
            ₹{originalPrice.toLocaleString()}
          </span>

          <span className="text-green-600 text-sm font-semibold">20% OFF</span>
        </div>

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className="mt-6 flex items-center justify-center gap-3 w-full bg-gradient-to-r from-green-700 to-emerald-600 text-white py-3 rounded-2xl font-semibold hover:scale-[1.02] transition duration-300 shadow-lg hover:shadow-green-200"
        >
          <FaShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
