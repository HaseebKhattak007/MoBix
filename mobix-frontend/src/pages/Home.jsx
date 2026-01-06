import Hero from "../components/Hero";
import Features from "../components/Features";
import ProductCard from "../components/ProductCard";
import BrandsSection from "../components/BrandsSection";
import { useApp } from "../context/AppContext";

const Home = () => {
  const { selectedCategory, setSelectedCategory, products, loading } = useApp();

  let filteredProducts = products;
  let title = "Featured Products";

  if (selectedCategory.startsWith("Search: ")) {
    const query = selectedCategory.replace("Search: ", "").toLowerCase();
    filteredProducts = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
    title = `Search Results for "${query.charAt(0).toUpperCase() + query.slice(1)}"`;
  } else if (selectedCategory !== "All") {
    filteredProducts = products.filter(p => p.category === selectedCategory);
    title = selectedCategory;
  }

  return (
    <div className="bg-[#f8f9fa] dark:bg-gray-800 min-h-screen pb-20 transition-colors duration-300">
      <Hero />
      <Features />

      <div id="featured-products" className="max-w-7xl mx-auto px-4 mt-16 scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 pb-4 border-b border-gray-200 dark:border-gray-800 gap-4">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 font-heading">
            {title}
          </h2>
          <div className="flex flex-wrap gap-4 md:gap-8 text-sm font-semibold text-gray-500 dark:text-gray-400">
            <span
              className={`cursor-pointer transition hover:text-primary ${selectedCategory === "All" ? "text-primary border-b-2 border-primary" : ""}`}
              onClick={() => setSelectedCategory("All")}
            >
              All
            </span>
            <span
              className={`cursor-pointer transition hover:text-primary ${selectedCategory === "Smartphones & Tablets" ? "text-primary border-b-2 border-primary" : ""}`}
              onClick={() => setSelectedCategory("Smartphones & Tablets")}
            >
              Smartphones
            </span>
            <span
              className={`cursor-pointer transition hover:text-primary ${selectedCategory === "Computers & Laptops" ? "text-primary border-b-2 border-primary" : ""}`}
              onClick={() => setSelectedCategory("Computers & Laptops")}
            >
              Laptops
            </span>
            <span
              className={`cursor-pointer transition hover:text-primary ${selectedCategory === "TV & Audio" ? "text-primary border-b-2 border-primary" : ""}`}
              onClick={() => setSelectedCategory("TV & Audio")}
            >
              Audio
            </span>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400 font-medium">Loading Products from Server...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 transition-colors">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 font-heading">No matching products</h3>
            <p className="text-gray-400 dark:text-gray-500">Try adjusting your search or category.</p>
            <button
              className="mt-6 bg-primary text-white px-8 py-3 rounded-lg font-bold hover:shadow-lg transition font-heading"
              onClick={() => setSelectedCategory("All")}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      <BrandsSection />
    </div>
  );
};

export default Home;
