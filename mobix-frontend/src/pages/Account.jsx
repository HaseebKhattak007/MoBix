import { useApp } from "../context/AppContext";
import { FaUser, FaEnvelope, FaPhone, FaHistory, FaEdit, FaBox, FaTicketAlt } from "react-icons/fa";

const Account = () => {
    const { user, logout } = useApp();

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
                            <button className="flex items-center gap-4 px-8 py-4 bg-primary/5 text-primary border-l-4 border-primary font-bold transition">
                                <FaUser /> Profile Details
                            </button>
                            <button className="flex items-center gap-4 px-8 py-4 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                <FaBox /> My Orders
                            </button>
                            <button className="flex items-center gap-4 px-8 py-4 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                <FaHistory /> Activity Log
                            </button>
                            <button className="flex items-center gap-4 px-8 py-4 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                                <FaTicketAlt /> Coupons
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border dark:border-gray-800">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Personal Information</h3>
                            <button className="flex items-center gap-2 text-primary font-bold hover:underline">
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
                                <p className="text-sm text-gray-500 dark:text-gray-400">Language</p>
                                <p className="text-lg font-medium text-gray-800 dark:text-gray-200">English</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border dark:border-gray-800">
                        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Recent Activity</h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center justify-between py-4 border-b dark:border-gray-800 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                                            <FaBox className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 dark:text-gray-200">Order #1234{i} Placed</p>
                                            <p className="text-sm text-gray-500">Jan {10 - i}, 2026</p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 bg-green-100 text-green-600 text-xs font-bold rounded-full uppercase">Completed</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
