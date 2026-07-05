import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeItem, total } = useCart();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
     const response = await fetch(
  `${import.meta.env.VITE_API_URL}/create-order`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: total,
    }),
  }
);
      

      const order = await response.json();

      const options = {
        key: "rzp_test_ST160pzxBjDNbW",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "AyurCare",
        description: "Ayurvedic Products Purchase",
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        handler: function (response) {
          alert("Payment Successful! 🎉");
          console.log(response);
          // Reset form and close
          setShowForm(false);
          setFormData({ name: "", email: "", phone: "" });
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-3xl shadow-xl border border-green-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 p-5 text-white">
          <h2 className="text-2xl font-bold">Shopping Cart</h2>
          <p className="text-sm opacity-90">{cart.length} Item(s)</p>
        </div>

        {/* Products */}
        <div className="max-h-[450px] overflow-y-auto p-4 space-y-4">
          {cart.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              🛒 Your cart is empty
            </div>
          )}

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 bg-green-50 rounded-2xl p-3 hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.name}</h3>

                <p className="text-green-700 font-bold mt-1">
                  ₹{item.price.toLocaleString()}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                    >
                      −
                    </button>

                    <span className="font-semibold">{item.quantity}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="w-8 h-8 rounded-full bg-green-700 text-white hover:bg-green-800 transition"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 text-sm hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-green-200 bg-white p-5 sticky bottom-0">
          <div className="flex justify-between text-lg font-bold mb-4">
            <span>Total</span>
            <span className="text-green-700">₹{total.toLocaleString()}</span>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={() => setShowForm(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-700 to-emerald-600 text-white font-bold text-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* Contact Information Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 md:p-8 animate-in fade-in zoom-in duration-300">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Contact Information
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 text-3xl transition"
              >
                ×
              </button>
            </div>

            <p className="text-gray-600 text-sm mb-6">
              Please provide your contact details to complete the purchase.
            </p>

            <form onSubmit={handlePayment} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="9876543210"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition"
                />
              </div>

              {/* Order Summary */}
              <div className="bg-green-50 rounded-xl p-4 mt-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-semibold">{cart.length}</span>
                </div>
                <div className="flex justify-between text-lg font-bold mt-2">
                  <span className="text-gray-800">Total Amount:</span>
                  <span className="text-green-700">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-700 to-emerald-600 text-white font-bold text-lg hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Pay ₹" + total.toLocaleString()
                )}
              </button>

              <p className="text-xs text-gray-500 text-center mt-4">
                🔒 Your information is secure and will only be used for order
                processing.
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
