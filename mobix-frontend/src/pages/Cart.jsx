import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useApp } from "../context/AppContext";
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

const Cart = () => {
  const { cart, removeFromCart, addToCart, decreaseQuantity, cartTotal, clearCart } = useCart();
  const { formatPrice, isLoggedIn, setIsAuthModalOpen } = useApp();

  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      toast.error("Please login to proceed to checkout");
      setIsAuthModalOpen(true);
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="bg-white dark:bg-gray-900 p-16 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 inline-block">
          <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-8 text-4xl">
            🛒
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-heading">Your cart is empty</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-sm mx-auto font-body">Looks like you haven't added anything to your cart yet. Let's find some amazing tech for you!</p>
          <Link to="/" className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:shadow-xl hover:shadow-primary/30 transition inline-block font-heading">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex items-center gap-4 mb-12">
        <Link to="/" className="text-gray-400 hover:text-primary transition">
          <FaArrowLeft />
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 font-heading">Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-8 border-b border-gray-100 dark:border-gray-800 hidden md:grid grid-cols-6 text-sm font-bold text-gray-400 uppercase tracking-wider">
              <div className="col-span-3 font-heading">Product</div>
              <div className="text-center font-heading">Price</div>
              <div className="text-center font-heading">Quantity</div>
              <div className="text-right font-heading">Total</div>
            </div>
            {cart.map((item) => {
              const itemId = item._id || item.id;
              return (
                <div key={itemId} className="p-8 border-b last:border-0 border-gray-50 dark:border-gray-800 grid grid-cols-1 md:grid-cols-6 items-center gap-6">
                  <div className="col-span-3 flex items-center gap-6">
                    <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-lg p-2 flex items-center justify-center border border-gray-100 dark:border-gray-700">
                      <img src={item.image} alt={item.name} className="max-h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg font-heading">{item.name}</h3>
                      <p className="text-sm text-gray-400 font-body">{item.brand}</p>
                      <button
                        className="mt-2 text-red-400 hover:text-red-500 text-sm font-bold flex items-center gap-2 transition font-heading"
                        onClick={() => removeFromCart(itemId)}
                      >
                        <FaTrash size={12} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                  <div className="text-center font-bold text-gray-800 dark:text-gray-200 font-body">
                    {formatPrice(item.price)}
                  </div>
                  <div className="flex justify-center">
                    <div className="flex items-center border border-gray-100 dark:border-gray-700 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800">
                      <button
                        className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-500"
                        onClick={() => decreaseQuantity(itemId)}
                      >
                        <FaMinus size={10} />
                      </button>
                      <span className="px-4 py-2 font-bold text-gray-800 dark:text-gray-100 min-w-[40px] text-center font-body">{item.quantity}</span>
                      <button
                        className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition text-gray-500"
                        onClick={() => addToCart(item)}
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-extrabold text-primary text-lg font-heading">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center px-4">
            <Link to="/" className="text-primary font-bold hover:underline flex items-center gap-2 font-heading">
              <FaArrowLeft size={12} />
              Continue Shopping
            </Link>
            <button
              className="text-gray-400 hover:text-red-500 font-bold transition flex items-center gap-2 font-heading"
              onClick={clearCart}
            >
              <FaTrash size={14} />
              Clear Shopping Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-8 pb-4 border-b border-gray-100 dark:border-gray-800 font-heading">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500 dark:text-gray-400 font-body">
                <span>Subtotal</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400 font-body">
                <span>Shipping</span>
                <span className="text-green-500 font-bold uppercase text-xs tracking-widest">Free</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400 font-body">
                <span>Tax (GST)</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{formatPrice(0)}</span>
              </div>
            </div>
            <div className="pt-8 border-t-2 border-dashed border-gray-100 dark:border-gray-800 space-y-6">
              <div className="flex justify-between items-end">
                <span className="text-gray-800 dark:text-gray-200 font-bold font-heading">Total Amount</span>
                <span className="text-4xl font-extrabold text-primary font-heading">{formatPrice(cartTotal)}</span>
              </div>
              <button
                className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/30 transition active:scale-[0.98] font-heading"
                onClick={handleCheckout}
              >
                Secure Checkout
              </button>
              <div className="flex items-center justify-center gap-3 text-xs text-gray-400 font-medium font-body">
                <i className="fas fa-lock text-green-500"></i>
                SSL Encrypted & Secure Payment
              </div>
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-body">
              <span className="font-bold text-primary block mb-1 font-heading">Coupon Code?</span>
              Enter your coupon code in the next step of checkout to get additional discounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
