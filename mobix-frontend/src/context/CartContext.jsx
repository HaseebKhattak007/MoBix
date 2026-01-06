import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => {
            const productId = product._id || product.id;
            const existing = prev.find((item) => (item._id || item.id) === productId);
            if (existing) {
                toast.success(`Increased ${product.name} quantity`);
                return prev.map((item) =>
                    (item._id || item.id) === productId ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            toast.success(`Added ${product.name} to cart`);
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const decreaseQuantity = (productId) => {
        setCart((prev) => {
            const existing = prev.find((item) => (item._id || item.id) === productId);
            if (existing.quantity > 1) {
                return prev.map((item) =>
                    (item._id || item.id) === productId ? { ...item, quantity: item.quantity - 1 } : item
                );
            }
            return prev.filter((item) => (item._id || item.id) !== productId);
        });
        toast.error("Reduced quantity");
    };

    const removeFromCart = (id) => {
        setCart((prev) => {
            const item = prev.find(i => (i._id || i.id) === id);
            if (item) toast.error(`Removed ${item.name} from cart`);
            return prev.filter((item) => (item._id || item.id) !== id);
        });
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
