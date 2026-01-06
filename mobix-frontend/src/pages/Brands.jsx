import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { useState } from "react";

const Brands = () => {
    const { products } = useApp();
    const [selectedBrand, setSelectedBrand] = useState(null);

    const brands = [...new Set(products.map(p => p.brand))];

    const filteredProducts = selectedBrand
        ? products.filter(p => p.brand === selectedBrand)
        : products;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-10 font-heading">Featured Brands</h1>

            <div className="flex flex-wrap gap-6 mb-16">
                <button
                    onClick={() => setSelectedBrand(null)}
                    className={`px-8 py-4 rounded-2xl font-bold transition-all shadow-sm border ${!selectedBrand ? 'bg-primary text-white border-primary shadow-primary/20' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:border-primary/50'}`}
                >
                    All Brands
                </button>
                {brands.map(brand => (
                    <button
                        key={brand}
                        onClick={() => setSelectedBrand(brand)}
                        className={`px-8 py-4 rounded-2xl font-bold transition-all shadow-sm border ${selectedBrand === brand ? 'bg-primary text-white border-primary shadow-primary/20' : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-800 hover:border-primary/50'}`}
                    >
                        {brand}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Brands;
