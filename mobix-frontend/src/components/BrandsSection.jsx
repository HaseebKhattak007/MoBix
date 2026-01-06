import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const BrandsSection = () => {
    const { products } = useApp();
    const navigate = useNavigate();

    // Get unique brands
    const brands = [...new Set(products.map(p => p.brand))];

    // In a real app, you'd have brand logos in assets. 
    // Here we'll use stylized text with icons/colors.
    const brandColors = {
        'Apple': 'text-[#555] dark:text-[#ddd]',
        'Samsung': 'text-[#034ea2] dark:text-[#5c9dff]',
        'Sony': 'text-[#000] dark:text-[#fff]',
        'Nintendo': 'text-[#e60012]',
        'Logitech': 'text-[#00b0ff]'
    };

    return (
        <section className="py-20 bg-white dark:bg-gray-900 border-t dark:border-gray-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-heading">Featured Brands</h2>
                    <button
                        onClick={() => navigate('/brands')}
                        className="text-primary font-bold hover:underline font-heading"
                    >
                        View All
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {brands.slice(0, 5).map((brand) => (
                        <div
                            key={brand}
                            onClick={() => navigate('/brands')}
                            className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl flex items-center justify-center cursor-pointer hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 border border-transparent hover:border-primary/20 group"
                        >
                            <span className={`text-2xl font-black uppercase tracking-tighter italic font-heading group-hover:scale-110 transition-transform ${brandColors[brand] || 'text-gray-400'}`}>
                                {brand}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandsSection;
