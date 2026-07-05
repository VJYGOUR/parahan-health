import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";

import banner from "../assets/banner.webp";
import hero from "../assets/hero.png";

import arogyamTailam from "../assets/arogyam_tailam.webp";
import facialOil from "../assets/facial_oil.webp";
import painOil from "../assets/pain_oil.webp";
import painPowder from "../assets/pain_powder.webp";
import pathogenOil from "../assets/pathogen_oil.webp";

const products = [
  {
    id: 1,
    name: "Arogyam Tailam",
    price: 499,
    image: arogyamTailam,
  },
  {
    id: 2,
    name: "Facial Oil",
    price: 399,
    image: facialOil,
  },
  {
    id: 3,
    name: "Pain Relief Oil",
    price: 349,
    image: painOil,
  },
  {
    id: 4,
    name: "Pain Relief Powder",
    price: 299,
    image: painPowder,
  },
  {
    id: 5,
    name: "Pathogen Oil",
    price: 599,
    image: pathogenOil,
  },
  {
    id: 6,
    name: "Arogyam Tailam (Combo)",
    price: 899,
    image: arogyamTailam,
  },
  {
    id: 7,
    name: "Facial Oil Premium",
    price: 699,
    image: facialOil,
  },
  {
    id: 8,
    name: "Pain Oil Plus",
    price: 499,
    image: painOil,
  },
];

export default function Home() {
  const [showCart, setShowCart] = useState(false);
  const { cart } = useCart();

  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-green-200/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 md:px-8">
          <h1 className="text-2xl md:text-4xl font-black text-green-700">
            PRAHANA HEALTH🌿
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button className="hover:text-green-700 font-medium transition text-gray-700">
              Home
            </button>

            <button className="hover:text-green-700 font-medium transition text-gray-700">
              Products
            </button>

            <button
              onClick={() => setShowCart(true)}
              className="relative bg-green-700 text-white px-6 py-2 rounded-full hover:bg-green-800 transition shadow-md hover:shadow-lg"
            >
              🛒 Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Cart */}
          <button
            onClick={() => setShowCart(true)}
            className="relative md:hidden bg-green-700 text-white px-4 py-2 rounded-full shadow-lg"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-green-700 font-semibold uppercase tracking-widest">
              100% Natural Ayurvedic Products
            </p>

            <h1 className="text-4xl md:text-6xl font-black mt-4 leading-tight text-gray-800">
              Heal Naturally,
              <br />
              Live Better 🌿
            </h1>

            <p className="mt-6 text-gray-600 text-lg">
              Discover authentic Ayurvedic oils and herbal products crafted from
              ancient Ayurvedic wisdom for healthy living.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="bg-green-700 text-white px-8 py-4 rounded-xl hover:bg-green-800 transition shadow-md hover:shadow-lg">
                Shop Now
              </button>

              <button className="border-2 border-green-700 text-green-700 px-8 py-4 rounded-xl hover:bg-green-50 transition">
                Learn More
              </button>
            </div>
          </div>

          <div className="relative">
            <img src={banner} className="rounded-3xl shadow-2xl" />

            <img
              src={hero}
              className="absolute -bottom-10 right-5 w-48 md:w-64"
            />
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 md:px-8 mb-10">
        <div className="rounded-3xl bg-gradient-to-r from-green-700 to-emerald-700 text-white p-10 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl">
          <div>
            <h2 className="text-3xl font-bold">🌿 Flat 20% OFF</h2>

            <p className="mt-3 text-green-100">
              On all Ayurvedic Oils this week.
            </p>
          </div>

          <button className="bg-white text-green-700 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition shadow-md">
            Shop Collection
          </button>
        </div>
      </section>
      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 pb-20 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-gray-800">
              Our Best Sellers
            </h2>

            <p className="text-green-700 mt-2 font-medium">
              Pure • Organic • Ayurvedic
            </p>
          </div>

          <button className="border border-green-200 rounded-xl px-5 py-3 hover:bg-green-50 w-full md:w-auto text-gray-700 hover:text-green-700 transition">
            View All
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Grid */}
          <div className="flex-1">
            <div
              className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-6
            "
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Desktop Cart */}
          <div className="hidden lg:block w-[360px] sticky top-24 h-fit">
            <Cart />
          </div>
        </div>
      </section>

      {/* Mobile Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/50 lg:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl h-[80vh] p-5 overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl font-bold text-gray-800">
                Shopping Cart
              </h2>

              <button
                onClick={() => setShowCart(false)}
                className="text-3xl text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>

            <Cart />
          </div>
        </div>
      )}
    </div>
  );
}
