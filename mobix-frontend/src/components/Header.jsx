import { useState } from "react";
import { FaSearch, FaHeart, FaCartPlus, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useApp } from "../context/AppContext";
import Logo from "../assets/MoBix-Logo.png";

const Header = () => {
    const { cartCount, cartTotal } = useCart();
    const { formatPrice, setSelectedCategory, wishlist } = useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            setSelectedCategory(`Search: ${searchTerm}`);
            navigate("/");
            setTimeout(() => {
                const element = document.getElementById("featured-products");
                if (element) element.scrollIntoView({ behavior: "smooth" });
            }, 100);
        }
    };

    return (
        <header className="bg-white dark:bg-gray-900 py-2 transition-all duration-300 border-b dark:border-gray-800 sticky top-0 md:relative z-40">
            <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
                {/* Logo */}
                <Link to="/" className="flex items-center group transition-transform hover:scale-105">
                    <img src={Logo} alt="Mobix Logo" className="h-20 md:h-24 lg:h-28 w-auto object-contain drop-shadow-sm" />
                </Link>

                {/* Search Bar */}
                <form
                    className="flex-1 max-w-3xl w-full flex items-center bg-[#f2f2f2] dark:bg-gray-800 rounded-md overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 transition-colors"
                    onSubmit={handleSearch}
                >
                    <input
                        type="text"
                        className="flex-1 px-6 py-4 outline-none bg-transparent text-gray-700 dark:text-gray-200 placeholder:text-gray-400 font-medium"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="px-6 py-4 border-l border-gray-300 dark:border-gray-700 flex items-center gap-2 cursor-pointer text-gray-600 dark:text-gray-400 hover:text-primary transition whitespace-nowrap hidden lg:flex font-medium">
                        <span>All Categories</span>
                        <FaChevronDown className="text-[10px]" />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white px-8 py-5 hover:bg-opacity-90 transition shadow-lg shadow-primary/20 active:scale-95"
                    >
                        <FaSearch size={18} />
                    </button>
                </form>

                {/* Actions */}
                <div className="flex items-center gap-10">
                    <Link to="/wishlist" className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative">
                            <FaHeart className="text-3xl text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors" />
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-dark font-bold">
                                {wishlist?.length || 0}
                            </span>
                        </div>
                        <div className="hidden xl:block">
                            <p className="text-[15px] font-bold text-gray-800 dark:text-gray-200">Wishlist</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{wishlist?.length || 0} items</p>
                        </div>
                    </Link>

                    <Link to="/cart" className="flex items-center gap-4 cursor-pointer group">
                        <div className="relative">
                            <FaCartPlus className="text-3xl text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors" />
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-dark font-bold">
                                {cartCount}
                            </span>
                        </div>
                        <div className="hidden xl:block">
                            <p className="text-[15px] font-bold text-gray-800 dark:text-gray-200">Cart</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">{formatPrice(cartTotal)}</p>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
