import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
    const { wishlist } = useApp();

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-10 font-heading">My Wishlist</h1>

            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {wishlist.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-3xl border dark:border-gray-800">
                    <p className="text-2xl text-gray-500 mb-6">Your wishlist is empty.</p>
                    <p className="text-gray-400">Save items you like to see them here.</p>
                </div>
            )}
        </div>
    );
};

export default Wishlist;
