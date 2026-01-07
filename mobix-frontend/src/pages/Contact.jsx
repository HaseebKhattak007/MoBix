const Contact = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="space-y-8">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Get In Touch</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Have a question or just want to say hi? We'd love to hear from you.</p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-white">Our Location</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">i10/3, Islamabad</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-white">Phone Number</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">+92 313 8518369</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-white">Email Address</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">ah340949@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800">
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">First Name</label>
                                <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 dark:text-white" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Last Name</label>
                                <input type="text" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 dark:text-white" placeholder="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Email Address</label>
                            <input type="email" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 dark:text-white" placeholder="john@example.com" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300">Message</label>
                            <textarea rows="4" className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-primary/20 dark:text-white" placeholder="How can we help?"></textarea>
                        </div>
                        <button className="w-full bg-primary text-white py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-primary/30 transition active:scale-[0.98]">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
