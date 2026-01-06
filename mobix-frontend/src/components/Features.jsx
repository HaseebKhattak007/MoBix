import { FaShippingFast, FaSync, FaWallet, FaTag } from "react-icons/fa";

const Features = () => {
    const items = [
        {
            icon: <FaShippingFast className="text-3xl text-primary" />,
            title: "Free Delivery",
            subtitle: "from $50",
        },
        {
            icon: <FaSync className="text-3xl text-primary" />,
            title: "Free Returns",
            subtitle: "30 Days Return",
        },
        {
            icon: <FaWallet className="text-3xl text-primary" />,
            title: "Secure Payment",
            subtitle: "100% Guaranteed",
        },
        {
            icon: <FaTag className="text-3xl text-primary" />,
            title: "Best Offers",
            subtitle: "Save up to 50%",
        },
    ];

    return (
        <section className="py-12 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-6 p-10 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-xl dark:hover:shadow-primary/5 transition-all duration-300 bg-white dark:bg-gray-800 group"
                        >
                            <div className="group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-gray-100 font-heading tracking-tight">{item.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-500 font-medium font-body">{item.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
