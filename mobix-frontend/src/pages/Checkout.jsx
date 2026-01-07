import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaTruck, FaLock, FaCheckCircle } from "react-icons/fa";

const Checkout = () => {
    const { cart, clearCart, cartTotal } = useCart();
    const { user, formatPrice } = useApp();
    const navigate = useNavigate();

    const [details, setDetails] = useState({
        name: user?.name || "",
        phone: user?.phone || "",
        address: "",
        city: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (cart.length === 0) {
            navigate("/cart");
        }
    }, [cart, navigate]);

    if (cart.length === 0) {
        return null;
    }

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (paymentMethod === "Online") {
            toast.error("Online Payment feature not available. Please use Cash on Delivery.");
            return;
        }

        setIsProcessing(true);

        try {
            const orderData = {
                orderItems: cart.map(item => ({
                    name: item.name,
                    qty: item.quantity,
                    image: item.image,
                    price: item.price,
                    product: item._id
                })),
                shippingAddress: details,
                paymentMethod: "Cash on Delivery",
                totalPrice: cartTotal,
            };

            const res = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("mobix_token")}`
                },
                body: JSON.stringify(orderData),
            });

            if (res.ok) {
                toast.success("Your order has been placed successfully!");
                clearCart();
                navigate("/account");
            } else {
                toast.error("Failed to place order");
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-10">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border dark:border-gray-800 shadow-sm">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                            <FaTruck className="text-primary" /> Shipping Details
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Full Name</label>
                                    <input
                                        required
                                        name="name"
                                        value={details.name}
                                        onChange={handleChange}
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Phone Number</label>
                                    <input
                                        required
                                        name="phone"
                                        value={details.phone}
                                        onChange={handleChange}
                                        type="text"
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                                        placeholder="Enter your phone"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Shipping Address</label>
                                <textarea
                                    required
                                    name="address"
                                    value={details.address}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                                    placeholder="House #, Street, Area..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">City</label>
                                <input
                                    required
                                    name="city"
                                    value={details.city}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                                    placeholder="Enter your city"
                                />
                            </div>

                            <hr className="my-8 dark:border-gray-800" />

                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                                <FaLock className="text-primary" /> Payment Method
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("COD")}
                                    className={`p-6 border-2 rounded-2xl flex flex-col items-center gap-3 transition ${paymentMethod === "COD" ? "border-primary bg-primary/5 text-primary" : "border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400"}`}
                                >
                                    <FaTruck size={24} />
                                    <span className="font-bold">Cash on Delivery</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod("Online")}
                                    className={`p-6 border-2 rounded-2xl flex flex-col items-center gap-3 transition ${paymentMethod === "Online" ? "border-primary bg-primary/5 text-primary" : "border-gray-100 dark:border-gray-800 text-gray-500 dark:text-gray-400"}`}
                                >
                                    <FaLock size={24} />
                                    <span className="font-bold">Pay Online</span>
                                </button>
                            </div>

                            <button
                                disabled={isProcessing}
                                type="submit"
                                className="w-full mt-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition disabled:opacity-70 flex items-center justify-center gap-2"
                            >
                                {isProcessing ? "Processing..." : <><FaCheckCircle /> Confirm Order</>}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border dark:border-gray-800 shadow-sm sticky top-24">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Order Summary</h3>
                        <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2">
                            {cart.map((item) => (
                                <div key={item._id} className="flex gap-4">
                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-1">{item.name}</h4>
                                        <p className="text-xs text-gray-500">{item.quantity} x {formatPrice(item.price)}</p>
                                    </div>
                                    <p className="text-sm font-bold text-primary">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="space-y-3 pt-6 border-t dark:border-gray-800">
                            <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                <span>Subtotal</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                            <div className="flex justify-between text-gray-500 dark:text-gray-400">
                                <span>Shipping</span>
                                <span className="text-green-500 font-bold">Free</span>
                            </div>
                            <div className="flex justify-between text-xl font-bold text-gray-800 dark:text-white pt-3 border-t dark:border-gray-800">
                                <span>Total</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
