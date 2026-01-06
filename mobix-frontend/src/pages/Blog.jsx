const Blog = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">Our Blog</h1>
            <p className="text-gray-500 text-lg">Stay tuned! We're currently writing some amazing content for you.</p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6 space-y-4">
                            <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                            <div className="h-6 bg-gray-200 w-3/4 rounded"></div>
                            <div className="h-4 bg-gray-200 w-full rounded"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog;
