import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const SuperDeals = () => {
    const { products } = useApp();
    const dealProducts = products.filter(p => p.discount > 0);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-3xl p-10 mb-12 text-white">
                <div className="max-w-2xl">
                    <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-widest mb-4 inline-block">Flash Sale</span>
                    <h1 className="text-5xl font-extrabold mb-6 font-heading leading-tight">MobiX Super Deals Up to 40% Off!</h1>
                    <p className="text-xl text-white/90 font-medium">Limited time offers on top brands include Apple, Samsung, and more. Grab yours before they are gone.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {dealProducts.length > 0 ? (
                    dealProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <p className="text-2xl text-gray-500">No deals available at the moment. Check back soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuperDeals;
