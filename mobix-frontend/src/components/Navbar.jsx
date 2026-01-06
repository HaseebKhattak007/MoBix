import { useState } from "react";
import { FaBars, FaChevronDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false);
  const { setSelectedCategory, darkMode } = useApp();
  const navigate = useNavigate();

  const categories = [
    "Computers & Laptops",
    "Cameras & Photos",
    "Hardware",
    "Smartphones & Tablets",
    "TV & Audio",
    "Gadgets",
    "Car Electronics",
    "Video Games & Consoles",
    "Accessories",
  ];

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setShowCategories(false);
    navigate("/");

    // Smooth scroll to products if on home page
    setTimeout(() => {
      const element = document.getElementById("featured-products");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleNavClick = (name) => {
    toast(`Viewing ${name}`, {
      icon: '🚀',
      style: {
        borderRadius: '10px',
        background: darkMode ? '#ffffff' : '#333',
        color: darkMode ? '#333' : '#fff',
      },
    });
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800 shadow-sm sticky top-0 z-50 hidden md:block transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 flex items-center relative">
        {/* Categories Toggle */}
        <div
          className="bg-primary text-white flex items-center gap-4 px-10 py-5 cursor-pointer hover:bg-opacity-95 transition min-w-[280px]"
          onClick={() => setShowCategories(!showCategories)}
        >
          <FaBars />
          <span className="font-bold uppercase text-sm flex-1 font-heading">Categories</span>
          <FaChevronDown className={`text-[10px] transition-transform ${showCategories ? "rotate-180" : ""}`} />
        </div>

        {/* Categories Dropdown */}
        {showCategories && (
          <div className="absolute top-full left-4 bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700 w-[280px] z-[100] animate-fade-in py-2">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="px-8 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary cursor-pointer transition-colors text-sm font-medium text-gray-600 dark:text-gray-300 border-b border-gray-50 dark:border-gray-800 last:border-0"
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </div>
            ))}
          </div>
        )}

        {/* Links */}
        <ul className="flex items-center gap-10 ml-12 text-[15px] font-medium text-gray-600 dark:text-gray-300">
          <li className="hover:text-primary transition py-5 font-heading uppercase tracking-wide">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-primary transition py-5 font-heading uppercase tracking-wide">
            <Link to="/super-deals">Super Deals</Link>
          </li>
          <li className="hover:text-primary transition py-5 font-heading uppercase tracking-wide">
            <Link to="/brands">Featured Brands</Link>
          </li>
          <li className="hover:text-primary transition py-5 font-heading uppercase tracking-wide">
            <Link to="/account">Account</Link>
          </li>
          <li className="hover:text-primary transition py-5 font-heading uppercase tracking-wide">
            <Link to="/blog">Blog</Link>
          </li>
          <li className="hover:text-primary transition py-5 font-heading uppercase tracking-wide">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
