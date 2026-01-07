import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { FaUser, FaEnvelope, FaPhone, FaHistory, FaEdit, FaBox, FaTicketAlt, FaLock, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const Account = () => {
    const { user, setUser, logout, formatPrice } = useApp();
    const [activeTab, setActiveTab] = useState("profile");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);

    const [editData, setEditData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        password: ""
    });

    useEffect(() => {
        if (user) {
            setEditData({
                name: user.name,
                email: user.email,
                phone: user.phone || "",
                password: ""
            });
            fetchOrders();
        }
    }, [user]);

    const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
            const res = await fetch("http://localhost:5000/api/orders/myorders", {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("mobix_token")}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoadingOrders(false);
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${sessionStorage.getItem("mobix_token")}`
                },
                body: JSON.stringify(editData),
            });
            const data = await res.json();
            if (res.ok) {
                setUser(data.user);
                sessionStorage.setItem("mobix_user", JSON.stringify(data.user));
                sessionStorage.setItem("mobix_token", data.token);
                toast.success("Profile updated successfully!");
                setIsEditModalOpen(false);
            } else {
                toast.error(data.message || "Failed to update profile");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    if (!user) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Please Sign In</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-8">You need to be logged in to view your account.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-10 font-heading">My Account</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border dark:border-gray-800">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                                <FaUser size={40} className="text-primary" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">{user.name}</h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user.email}</p>
                            <button
                                onClick={logout}
                                className="mt-6 w-full py-3 bg-red-50 text-red-500 font-bold rounded-xl hover:bg-red-100 transition"
                            >
                                Sign Out
                            </button>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border dark:border-gray-800 overflow-hidden">
                        <nav className="flex flex-col">
                            <button
                                onClick={() => setActiveTab("profile")}
                                className={`flex items-center gap-4 px-8 py-4 transition font-bold ${activeTab === "profile" ? "bg-primary/5 text-primary border-l-4 border-primary" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                            >
                                <FaUser /> Profile Details
                            </button>
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`flex items-center gap-4 px-8 py-4 transition font-bold ${activeTab === "orders" ? "bg-primary/5 text-primary border-l-4 border-primary" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                            >
                                <FaBox /> My Orders
                            </button>
                            <button
                                onClick={() => setActiveTab("activity")}
                                className={`flex items-center gap-4 px-8 py-4 transition font-bold ${activeTab === "activity" ? "bg-primary/5 text-primary border-l-4 border-primary" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"}`}
                            >
                                <FaHistory /> Activity Log
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {activeTab === "profile" && (
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border dark:border-gray-800">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Personal Information</h3>
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="flex items-center gap-2 text-primary font-bold hover:underline"
                                >
                                    <FaEdit /> Edit Profile
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{user.name}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{user.email}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Phone Number</p>
                                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{user.phone || "Not provided"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Account Created</p>
                                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {(activeTab === "orders" || activeTab === "activity") && (
                        <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border dark:border-gray-800">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{activeTab === "orders" ? "Order History" : "Recent Activity"}</h3>
                            {loadingOrders ? (
                                <p className="text-gray-500">Loading...</p>
                            ) : orders.length > 0 ? (
                                <div className="space-y-6">
                                    {orders.map((order) => (
                                        <div key={order._id} className="flex items-center justify-between py-4 border-b dark:border-gray-800 last:border-0">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                                    <FaBox />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-gray-800 dark:text-gray-200 truncate max-w-[200px]">
                                                        {order.orderItems.map(item => item.name).join(", ")}
                                                    </p>
                                                    <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-primary">{formatPrice(order.totalPrice)}</p>
                                                <span className={`px-3 py-1 text-[10px] font-bold rounded-full uppercase ${order.isDelivered ? "bg-green-100 text-green-600" : "bg-blue-100 text-blue-600"}`}>
                                                    {order.isDelivered ? "Delivered" : "Processing"}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">No orders found.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Edit Profile Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Edit Profile</h3>
                            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                                <FaTimes />
                            </button>
                        </div>
                        <form onSubmit={handleUpdateProfile} className="p-6 space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <FaUser size={12} /> Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={editData.name}
                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <FaEnvelope size={12} /> Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={editData.email}
                                    onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <FaPhone size={12} /> Phone Number
                                </label>
                                <input
                                    type="text"
                                    value={editData.phone}
                                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                                />
                            </div>
                            <div className="space-y-1 pt-2">
                                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 flex items-center gap-2">
                                    <FaLock size={12} /> New Password (leave blank to keep current)
                                </label>
                                <input
                                    type="password"
                                    value={editData.password}
                                    onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 dark:text-white"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-6 py-3 bg-primary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition active:scale-[0.98]"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;
