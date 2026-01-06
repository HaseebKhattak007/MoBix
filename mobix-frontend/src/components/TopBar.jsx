import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaChevronDown, FaUser, FaSignOutAlt, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

const TopBar = () => {
    const { currency, setCurrency, isLoggedIn, user, logout, setIsAuthModalOpen, darkMode, toggleDarkMode } = useApp();
    const [showCurrency, setShowCurrency] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-800 py-2 hidden md:block relative z-[60] transition-colors duration-300">
            <div className="container mx-auto px-4 flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <FaPhoneAlt className="text-primary" />
                        <span>+92 313 8518369</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaEnvelope className="text-primary" />
                        <span>ah340949@gmail.com</span>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    {/* Dark Mode Toggle */}
                    <div
                        className="flex items-center gap-2 cursor-pointer hover:text-primary transition p-1 bg-gray-100 dark:bg-gray-800 rounded-full px-3"
                        onClick={toggleDarkMode}
                    >
                        {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-400" />}
                        <span className="font-bold">{darkMode ? "Light" : "Dark"}</span>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition border-l dark:border-gray-700 pl-6">
                        <span>English</span>
                        <FaChevronDown className="text-[10px]" />
                    </div>
                    <div className="relative">
                        <div
                            className="flex items-center gap-2 cursor-pointer hover:text-primary transition"
                            onClick={() => setShowCurrency(!showCurrency)}
                        >
                            <span>{currency === "USD" ? "$ US dollar" : "Rs PKR"}</span>
                            <FaChevronDown className="text-[10px]" />
                        </div>
                        {showCurrency && (
                            <div className="absolute top-full mt-2 left-0 bg-white dark:bg-gray-900 shadow-xl border border-gray-100 dark:border-gray-800 rounded py-2 min-w-[120px] shadow-primary/10 z-[100]">
                                <div
                                    className={`px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition ${currency === "USD" ? "text-primary font-bold" : ""}`}
                                    onClick={() => { setCurrency("USD"); setShowCurrency(false); }}
                                >
                                    $ US dollar
                                </div>
                                <div
                                    className={`px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition ${currency === "PKR" ? "text-primary font-bold" : ""}`}
                                    onClick={() => { setCurrency("PKR"); setShowCurrency(false); }}
                                >
                                    Rs PKR
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4 ml-6 border-l pl-6 border-gray-300 dark:border-gray-700">
                        {isLoggedIn ? (
                            <div className="flex items-center gap-4">
                                <Link to="/account" className="flex items-center gap-2 text-primary font-semibold hover:underline">
                                    <FaUser />
                                    <span>{user?.name}</span>
                                </Link>
                                <div
                                    className="flex items-center gap-2 cursor-pointer hover:text-red-500 transition"
                                    onClick={logout}
                                >
                                    <FaSignOutAlt />
                                    <span>Sign out</span>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div
                                    className="flex items-center gap-2 cursor-pointer hover:text-primary transition"
                                    onClick={() => setIsAuthModalOpen(true)}
                                >
                                    <FaUser />
                                    <span>Register/Sign in</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBar;
