import { FaEye, FaHeart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useApp } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { formatPrice, toggleWishlist, wishlist } = useApp();
  const isInWishlist = wishlist?.some(item => item._id === product._id);

  return (
    <div className="bg-white dark:bg-gray-900 group rounded-lg p-6 hover:shadow-2xl transition-all duration-300 relative border border-gray-100 dark:border-gray-800 flex flex-col h-full ring-primary/0 hover:ring-2 hover:ring-primary/20">
      {/* Quick Actions */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button
          className={`w-10 h-10 ${isInWishlist ? 'bg-primary text-white' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'} rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition`}
          onClick={() => toggleWishlist(product)}
        >
          <FaHeart />
        </button>
        <button className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition text-gray-600 dark:text-gray-400">
          <FaEye />
        </button>
      </div>

      <div className="relative overflow-hidden mb-6 h-48 flex items-center justify-center bg-gray-50/50 dark:bg-gray-800/50 rounded-xl p-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full group-hover:scale-110 transition-transform duration-500 object-contain drop-shadow-md"
        />
      </div>

      <div className="space-y-2 flex-grow">
        <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">{product.category}</p>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 group-hover:text-primary transition line-clamp-1 font-heading">{product.name}</h3>
        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium font-body">{product.brand}</p>
      </div>

      <div className="flex items-center justify-between pt-6 mt-auto border-t border-gray-50 dark:border-gray-800">
        <p className="text-xl font-extrabold text-dark dark:text-white font-heading">{formatPrice(product.price)}</p>
        <button
          className="bg-primary hover:bg-opacity-90 text-white px-5 py-2.5 rounded-lg text-xs font-bold transition active:scale-95 shadow-md shadow-primary/10 hover:shadow-primary/30 font-heading"
          onClick={() => addToCart(product)}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
