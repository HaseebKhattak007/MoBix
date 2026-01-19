import { FaChevronRight } from "react-icons/fa";
import { useApp } from "../context/AppContext";
import heroImage from "../assets/hero_mobile.png";

const Hero = () => {
    const { setSelectedCategory, selectedCategory } = useApp();
    const categories = [
        "Computers & Laptops",
        "Cameras & Photos",
        "Hardware",
        "Smartphones & Tablets",
        "TV & Audio",
        "Gadgets",
        "Car Electronics",
        "Video Games & Consoles",
        "Accessories",
    ];

    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
        const element = document.getElementById("featured-products");
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 flex ">
                <aside className="hidden lg:block w-[300px] bg-white dark:bg-gray-900 border-x border-b border-gray-100 dark:border-gray-800 shadow-sm z-20 transition-colors">
                    <ul className="py-2">
                        <li
                            className={`px-8 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-between group cursor-pointer transition-colors ${selectedCategory === "All" ? "bg-gray-50 dark:bg-gray-800 text-primary" : ""}`}
                            onClick={() => handleCategoryClick("All")}
                        >
                            <span className={`text-[15px] font-medium ${selectedCategory === "All" ? "text-primary font-bold" : "text-gray-600 dark:text-gray-400 group-hover:text-primary"}`}>All Categories</span>
                        </li>
                        {categories.map((cat, index) => (
                            <li
                                key={index}
                                className={`px-8 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-between group cursor-pointer transition-colors ${selectedCategory === cat ? "bg-gray-50 dark:bg-gray-800 text-primary border-l-4 border-primary" : ""}`}
                                onClick={() => handleCategoryClick(cat)}
                            >
                                <span className={`text-[15px] font-medium ${selectedCategory === cat ? "text-primary font-bold" : "text-gray-600 dark:text-gray-400 group-hover:text-primary"}`}>
                                    {cat}
                                </span>
                                {(cat === "Hardware" || cat === "Smartphones & Tablets") && (
                                    <FaChevronRight className="text-[10px] text-gray-400" />
                                )}
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="flex-1 lg:pl-12 py-12 md:py-24 relative min-h-[500px] flex items-center">
                    {/* Background Image Layer */}
                    <div className="absolute right-[-200px] top-0 w-full h-full opacity-20 md:opacity-100 pointer-events-none z-0 overflow-hidden">
                        <img
                            src={heroImage}
                            alt="Hero"
                            className="absolute right-[-10%] md:right-[-5%] top-1/2 -translate-y-1/2 w-[90%] md:w-[65%] lg:w-[60%] h-auto object-contain drop-shadow-2xl animate-float opacity-80"
                        />
                    </div>

                    <div className="relative z-10 w-full md:w-3/5 space-y-8 animate-fade-in">
                        <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wider mb-2">
                            LIMITED EDITION 2026
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold text-gray-800 dark:text-gray-100 leading-[1.1] font-heading drop-shadow-sm">
                            NEW ERA OF <br />
                            <span className="text-primary/90">SMARTPHONES</span>
                        </h1>
                        <div className="flex items-center gap-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl w-fit">
                            <div className="flex items-center gap-4">
                                <span className="text-2xl text-gray-400 dark:text-gray-600 line-through font-medium font-heading">$1299</span>
                                <span className="text-4xl text-red-500 font-extrabold font-heading">$999</span>
                            </div>
                            <div className="h-10 w-[1px] bg-gray-300 dark:bg-gray-700 mx-2"></div>
                            <p className="text-xl text-gray-600 dark:text-gray-300 font-bold font-body">Apple iPhone 15 Pro Max</p>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <button className="bg-primary text-white px-12 py-5 rounded-md font-bold text-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 font-heading">
                                Shop Now
                            </button>
                            <button className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 px-12 py-5 rounded-md font-bold text-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95 font-heading">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent pointer-events-none z-0"></div>
        </section>
    );
};

export default Hero;
