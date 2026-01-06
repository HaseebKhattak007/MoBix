import { useState } from "react";
import { FaTimes, FaUser, FaEnvelope, FaLock, FaPhone, FaCheckCircle, FaGoogle, FaFacebookF } from "react-icons/fa";
import { useApp } from "../context/AppContext";

const AuthModal = ({ isOpen, onClose }) => {
    const { login, register } = useApp();
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [loading, setLoading] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (isRegister && formData.password !== formData.confirmPassword) {
            alert("Passwords do not match");
            setLoading(false);
            return;
        }

        let success;
        if (!isRegister) {
            success = await login(formData.email, formData.password);
        } else {
            success = await register(formData.name, formData.email, formData.phone, formData.password);
        }

        if (success) {
            onClose();
            setFormData({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative z-10 transform transition-all duration-300 scale-100 border dark:border-gray-800">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors bg-gray-100 dark:bg-gray-800 p-2 rounded-full"
                >
                    <FaTimes size={16} />
                </button>

                <div className="p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-heading">
                            {isRegister ? "Create Account" : "Welcome Back"}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">
                            {isRegister
                                ? "Join Mobix and start shopping today"
                                : "Enter your details to access your account"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isRegister && (
                            <>
                                <div className="relative">
                                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="relative">
                                    <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        required
                                        className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </>
                        )}

                        <div className="relative">
                            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="relative">
                            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>

                        {isRegister && (
                            <div className="relative">
                                <FaCheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    required
                                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all dark:text-white"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                !isRegister ? "Sign In" : "Create Account"
                            )}
                        </button>
                    </form>

                    <div className="relative my-8 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <span className="relative px-4 bg-white dark:bg-gray-900 text-xs text-gray-400 font-bold">OR CONTINUE WITH</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition font-bold text-sm text-gray-600 dark:text-gray-300">
                            <FaGoogle className="text-red-500" /> Google
                        </button>
                        <button className="flex items-center justify-center gap-3 py-3 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition font-bold text-sm text-gray-600 dark:text-gray-300">
                            <FaFacebookF className="text-blue-600" /> Facebook
                        </button>
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
                            <button
                                onClick={() => setIsRegister(!isRegister)}
                                className="text-primary font-bold hover:underline"
                            >
                                {isRegister ? "Sign In" : "Sign Up"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
