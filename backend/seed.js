const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
    {
        name: "Apple iPhone 15 Pro",
        price: 620,
        image: "/images/iphone15.jpg",
        category: "Smartphones & Tablets",
        brand: "Apple",
        description: "The latest iPhone with titanium design.",
        featured: true,
        discount: 10
    },
    {
        name: "Samsung Galaxy S23 Ultra",
        price: 680,
        image: "/images/samsung_s23.jpg",
        category: "Smartphones & Tablets",
        brand: "Samsung",
        description: "Ultimate camera performance.",
        featured: true,
        discount: 15
    },
    {
        name: "Google Pixel 8 Pro",
        price: 600,
        image: "/images/google-pixel-8-pro.jpg",
        category: "Smartphones & Tablets",
        brand: "Google",
        description: "The best of Google AI.",
        featured: true,
        discount: 5
    },
    {
        name: "Sony Alpha A7 IV",
        price: 3550,
        image: "/images/Sony-A7.jpg",
        category: "Cameras & Photos",
        brand: "Sony",
        description: "The perfect hybrid camera.",
        featured: true,
        discount: 5
    },
    {
        name: "Canon EOS R5",
        price: 3299,
        image: "/images/canon.jpg",
        category: "Cameras & Photos",
        brand: "Canon",
        description: "High-resolution full-frame mirrorless.",
        featured: false,
        discount: 0
    },
    {
        name: "MacBook Pro M3 Max",
        price: 4499,
        image: "/images/macbook.jpg",
        category: "Computers & Laptops",
        brand: "Apple",
        description: "Most powerful MacBook ever.",
        featured: true,
        discount: 0
    },
    {
        name: "Dell XPS 15",
        price: 2899,
        image: "/images/Dell-XPS.png",
        category: "Computers & Laptops",
        brand: "Dell",
        description: "Stunning display and performance.",
        featured: true,
        discount: 10
    },
    {
        name: "Nintendo Switch OLED",
        price: 249,
        image: "/images/Switch.jpg",
        category: "Video Games & Consoles",
        brand: "Nintendo",
        description: "Vibrant OLED screen for handheld gaming.",
        featured: true,
        discount: 20
    },
    {
        name: "PlayStation 5 DualSense",
        price: 105,
        image: "/images/PS-dualsense.png",
        category: "Video Games & Consoles",
        brand: "Sony",
        description: "Immersive haptic feedback.",
        featured: false,
        discount: 5
    },
    {
        name: "Sony WH-1000XM5",
        price: 80,
        image: "/images/sony-wh-.jpg",
        category: "TV & Audio",
        brand: "Sony",
        description: "Best-in-class noise cancellation.",
        featured: true,
        discount: 10
    },
    {
        name: "Bose QuietComfort Ultra",
        price: 72,
        image: "/images/headset.jpg",
        category: "TV & Audio",
        brand: "Bose",
        description: "Legendary noise cancellation.",
        featured: false,
        discount: 15
    },
    {
        name: "Logitech G Pro X",
        price: 110,
        image: "/images/logitech.jpg",
        category: "Accessories",
        brand: "Logitech",
        description: "Professional gaming mouse.",
        featured: true,
        discount: 5
    },
    {
        name: "Razer BlackWidow V4",
        price: 115,
        image: "/images/Razer-BlackWidow-V4.jpg",
        category: "Accessories",
        brand: "Razer",
        description: "Mechanical gaming keyboard.",
        featured: false,
        discount: 10
    },
    {
        name: "Apple Watch Series 9",
        price: 329,
        image: "/images/watch.jpg",
        category: "Gadgets",
        brand: "Apple",
        description: "Advanced health features.",
        featured: true,
        discount: 12
    },
    {
        name: "Samsung Galaxy Watch 6",
        price: 299,
        image: "/images/Samsung-Galaxy-Watch-6.jpg",
        category: "Gadgets",
        brand: "Samsung",
        description: "Personalized fitness tracking.",
        featured: false,
        discount: 10
    },
    {
        name: "NVIDIA RTX 4090",
        price: 1599,
        image: "/images/NVIDIA-RTX-4090.jpg",
        category: "Hardware",
        brand: "NVIDIA",
        description: "Ultimate graphics performance.",
        featured: true,
        discount: 0
    },
    {
        name: "Tesla Wall Connector",
        price: 475,
        image: "/images/Tesla-Wall-Connector.jpg",
        category: "Car Electronics",
        brand: "Tesla",
        description: "Fast home charging for EVs.",
        featured: true,
        discount: 5
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log("Database Seeded!");
        process.exit();
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
