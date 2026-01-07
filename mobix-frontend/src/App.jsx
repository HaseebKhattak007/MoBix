import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import SuperDeals from "./pages/SuperDeals";
import Wishlist from "./pages/Wishlist";
import Brands from "./pages/Brands";
import Checkout from "./pages/Checkout";
import AuthModal from "./components/AuthModal";

import { AppProvider, useApp } from "./context/AppContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

const AppContent = () => {
  const { isAuthModalOpen, setIsAuthModalOpen } = useApp();
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <BrowserRouter>
        <Toaster position="bottom-right" reverseOrder={false} />
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
        <TopBar />
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account />} />
          <Route path="/super-deals" element={<SuperDeals />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AppProvider>
  );
}

export default App;
