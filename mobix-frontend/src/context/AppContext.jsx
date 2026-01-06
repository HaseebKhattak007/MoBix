import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [currency, setCurrency] = useState("USD");
    const [exchangeRate, setExchangeRate] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    const [wishlist, setWishlist] = useState([]);

    // Initial check for dark mode and auth
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
        }

        const token = localStorage.getItem("mobix_token");
        const savedUser = localStorage.getItem("mobix_user");
        if (token && savedUser) {
            setIsLoggedIn(true);
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // Sync dark mode class with state
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("theme", newDarkMode ? "dark" : "light");
        toast.success(newDarkMode ? "Dark Mode Enabled" : "Light Mode Enabled");
    };

    const toggleWishlist = (product) => {
        setWishlist((prev) => {
            const exists = prev.find((item) => item._id === product._id);
            if (exists) {
                toast.success("Removed from wishlist");
                return prev.filter((item) => item._id !== product._id);
            } else {
                toast.success("Added to wishlist");
                return [...prev, product];
            }
        });
    };

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/products");
                const data = await res.json();
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                toast.error("Failed to load products from server");
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // Update exchange rate when currency changes
    useEffect(() => {
        if (currency === "PKR") {
            setExchangeRate(280); // Dummy rate
            toast.success("Currency changed to PKR");
        } else {
            setExchangeRate(1);
            if (currency === "USD") {
                toast.success("Currency changed to USD");
            }
        }
    }, [currency]);

    const login = async (email, password) => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (res.ok) {
                setIsLoggedIn(true);
                setUser(data.user);
                localStorage.setItem("mobix_token", data.token);
                localStorage.setItem("mobix_user", JSON.stringify(data.user));
                toast.success(`Welcome back, ${data.user.name}!`);
                return true;
            } else {
                toast.error(data.message || "Login failed");
                return false;
            }
        } catch (error) {
            toast.error("Server connection error");
            return false;
        }
    };

    const register = async (name, email, phone, password) => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone, password }),
            });
            const data = await res.json();
            if (res.ok) {
                setIsLoggedIn(true);
                setUser(data.user);
                localStorage.setItem("mobix_token", data.token);
                localStorage.setItem("mobix_user", JSON.stringify(data.user));
                toast.success("Account created successfully!");
                return true;
            } else {
                toast.error(data.message || "Registration failed");
                return false;
            }
        } catch (error) {
            toast.error("Server connection error");
            return false;
        }
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem("mobix_token");
        localStorage.removeItem("mobix_user");
        toast.error("Logged out successfully");
    };

    const formatPrice = (price) => {
        const convertedPrice = (price * exchangeRate).toFixed(2);
        return currency === "PKR" ? `Rs ${Number(convertedPrice).toLocaleString()}` : `$${Number(convertedPrice).toLocaleString()}`;
    };

    return (
        <AppContext.Provider
            value={{
                currency,
                setCurrency,
                selectedCategory,
                setSelectedCategory,
                isLoggedIn,
                user,
                setUser,
                login,
                register,
                logout,
                formatPrice,
                isAuthModalOpen,
                setIsAuthModalOpen,
                products,
                loading,
                darkMode,
                toggleDarkMode,
                wishlist,
                toggleWishlist
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
