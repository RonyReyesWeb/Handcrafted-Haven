"use client";

import Link from "next/link";
import { useSyncExternalStore, useState } from "react";

const CATEGORIES = [
  "All",
  "Home Decor",
  "Kitchen",
  "Apparel",
  "Jewelry",
  "Toys & Games",
  "Art & Prints",
  "Bath & Beauty",
  "Other",
];

const PRODUCTS = [
  {
    id: 1,
    name: "Handwoven Basket",
    price: 45,
    category: "Home Decor",
    seller: "Maria G.",
    rating: 4.8,
    reviews: 12,
    emoji: "🧺",
    description:
      "A beautifully handwoven basket made from sustainable natural fibers. Perfect for organizing blankets, toys, or everyday essentials while adding a warm artisanal touch to any room.",
    materials: "Natural palm fibers",
    stock: 15,
    shippingTime: "3-5 business days",
  },

  {
    id: 2,
    name: "Ceramic Mug Set",
    price: 38,
    category: "Kitchen",
    seller: "Javiera L.",
    rating: 4.5,
    reviews: 8,
    emoji: "☕",
    description:
      "A charming set of handmade ceramic mugs crafted with care by local artisans. Each piece features unique glazing patterns, making every cup one of a kind.",
    materials: "Hand-fired ceramic",
    stock: 12,
    shippingTime: "2-4 business days",
  },

  {
    id: 3,
    name: "Knitted Scarf",
    price: 52,
    category: "Apparel",
    seller: "Rony R.",
    rating: 5.0,
    reviews: 20,
    emoji: "🧣",
    description:
      "Soft, cozy, and handmade with premium yarn, this knitted scarf provides warmth and comfort during colder seasons while showcasing traditional craftsmanship.",
    materials: "Premium wool blend",
    stock: 8,
    shippingTime: "1-3 business days",
  },

  {
    id: 4,
    name: "Silver Leaf Ring",
    price: 29,
    category: "Jewelry",
    seller: "Ana P.",
    rating: 4.7,
    reviews: 15,
    emoji: "💍",
    description:
      "An elegant sterling silver ring inspired by the delicate shapes of nature. Carefully handcrafted and polished to create a timeless accessory for everyday wear.",
    materials: "925 sterling silver",
    stock: 20,
    shippingTime: "3-7 business days",
  },

  {
    id: 5,
    name: "Watercolor Print",
    price: 65,
    category: "Art & Prints",
    seller: "Carlos M.",
    rating: 4.9,
    reviews: 6,
    emoji: "🎨",
    description:
      "A vibrant watercolor art print created from an original hand-painted design. Printed on high-quality paper, it brings color and creativity to any living space.",
    materials: "Archival art paper",
    stock: 25,
    shippingTime: "2-5 business days",
  },

  {
    id: 6,
    name: "Lavender Soap Bar",
    price: 18,
    category: "Bath & Beauty",
    seller: "Sofia R.",
    rating: 4.6,
    reviews: 30,
    emoji: "🧼",
    description:
      "Handcrafted with natural ingredients and infused with soothing lavender, this soap bar gently cleanses the skin while providing a relaxing aromatherapy experience.",
    materials: "Natural oils and lavender extract",
    stock: 40,
    shippingTime: "1-2 business days",
  },

  {
    id: 7,
    name: "Wooden Puzzle",
    price: 34,
    category: "Toys & Games",
    seller: "Pedro A.",
    rating: 4.4,
    reviews: 9,
    emoji: "🧩",
    description:
      "A handcrafted wooden puzzle designed to challenge the mind while providing hours of fun. Made from durable materials and finished with child-safe coatings.",
    materials: "Sustainably sourced wood",
    stock: 18,
    shippingTime: "2-4 business days",
  },

  {
    id: 8,
    name: "Macramé Wall Art",
    price: 78,
    category: "Home Decor",
    seller: "Lucia V.",
    rating: 4.8,
    reviews: 17,
    emoji: "🪢",
    description:
      "A decorative macramÃ© wall hanging carefully knotted by hand. Its intricate patterns and natural textures create a cozy bohemian atmosphere in any room.",
    materials: "Cotton cord",
    stock: 10,
    shippingTime: "4-6 business days",
  },

  {
    id: 9,
    name: "Hand-dyed Tote Bag",
    price: 42,
    category: "Apparel",
    seller: "Javiera L.",
    rating: 4.3,
    reviews: 11,
    emoji: "👜",
    description:
      "A reusable tote bag featuring hand-dyed fabric and unique color patterns. Lightweight, durable, and perfect for shopping, work, or everyday use.",
    materials: "Organic cotton",
    stock: 22,
    shippingTime: "2-4 business days",
  },
];

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  seller: string;
  rating: number;
  reviews: number;
  emoji: string;
  description: string;
  materials: string;
  stock: number;
  shippingTime: string;
};

type CartItem = Product & {
  quantity: number;
};

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Top Rated", value: "rating" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 text-xs text-[#BA7517]">
      {"★".repeat(Math.floor(rating))}
      {rating % 1 >= 0.5 ? "½" : ""}
      <span className="text-[#5F5E5A] ml-1">{rating.toFixed(1)}</span>
    </span>
  );
}

function readCart() {
  if (typeof window === "undefined") return [];

  const savedCart = localStorage.getItem("cart");

  if (!savedCart) return [];

  return JSON.parse(savedCart) as CartItem[];
}

function getCartCount() {
  const cart = readCart();

  return cart.reduce((total, item) => total + item.quantity, 0);
}

function subscribeToCart(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("cart-updated", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("cart-updated", callback);
  };
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [maxPrice, setMaxPrice] = useState(200);
  const [search, setSearch] = useState("");
  const cartCount = useSyncExternalStore(
    subscribeToCart,
    getCartCount,
    () => 0
  );

  function addToCart(product: Product) {
    const savedCart = localStorage.getItem("cart");
    const cart: CartItem[] = savedCart ? JSON.parse(savedCart) : [];

    const existingProduct = cart.find((item) => item.id === product.id);

    let updatedCart: CartItem[];

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
  }

  const filtered = PRODUCTS
    .filter((p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.price <= maxPrice &&
      (search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()) ||
        p.seller.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === "price_asc") return a.price - b.price;
      if (sortBy === "price_desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.id - a.id; // newest
    });

  return (
    <div className="min-h-screen bg-[#F1EFE8] font-sans">

      {/* Header */}
      <header className="w-full bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-2xl font-bold text-[#D85A30]">
            Handcrafted Haven
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm font-medium text-[#5F5E5A] sm:gap-6">
            <Link href="/" className="hover:text-[#D85A30] transition-colors">Home</Link>
            <Link href="/shop" className="text-[#D85A30] font-semibold transition-colors">Shop</Link>
            <Link href="/sellers" className="hover:text-[#D85A30] transition-colors">Sellers</Link>
            <Link href="/sell/new" className="hover:text-[#D85A30] transition-colors">Sell</Link>
            <Link
              href="/cart"
              className="relative hover:text-[#D85A30] transition-colors"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -right-4 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#D85A30] px-1.5 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="w-full bg-[#D85A30] px-4 py-10 text-center text-white sm:px-6 lg:px-8">
        <h1 className="mb-2 text-3xl font-bold sm:text-4xl">Browse the Shop</h1>
        <p className="text-white/80 text-sm max-w-md mx-auto">
          Discover handcrafted goods made with love by independent artisans.
        </p>

        {/* Search bar */}
        <div className="mt-6 max-w-md mx-auto relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D85A30]">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, categories, sellers..."
            className="w-full pl-10 pr-4 py-3 rounded-full bg-white/30 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-white backdrop-blur-sm"
          />
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:items-start lg:px-8 lg:py-10">

        {/* Sidebar Filters */}
        <aside className="flex w-full flex-shrink-0 flex-col gap-6 lg:w-56">

          {/* Category Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-sm font-bold text-[#5F5E5A] mb-3 uppercase tracking-wide">
              Category
            </h3>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-col">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                      selectedCategory === cat
                        ? "bg-[#D85A30] text-white font-semibold"
                        : "text-[#5F5E5A] hover:bg-[#F1EFE8]"
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-sm font-bold text-[#5F5E5A] mb-3 uppercase tracking-wide">
              Max Price
            </h3>
            <input
              type="range"
              min={10}
              max={200}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#D85A30]"
            />
            <div className="flex justify-between text-xs text-[#5F5E5A] mt-1">
              <span>$10</span>
              <span className="font-semibold text-[#D85A30]">${maxPrice}</span>
              <span>$200</span>
            </div>
          </div>

        </aside>

        {/* Product Grid */}
        <div className="w-full flex-1">

          {/* Toolbar */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-[#5F5E5A]">
              <span className="font-semibold text-[#D85A30]">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "product" : "products"} found
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full rounded-xl border border-[#E0DDD6] bg-white px-4 py-2 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30] sm:w-auto"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Cards */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="text-5xl mb-4">🔎</span>
              <p className="text-[#5F5E5A] font-semibold text-lg">No products found</p>
              <p className="text-[#5F5E5A] text-sm opacity-60 mt-1">
                Try adjusting your filters or search term.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group"
                >
                  {/* Image placeholder */}
                  <div className="w-full h-44 bg-[#F1EFE8] flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300">
                    {product.emoji}
                  </div>

                  <div className="p-4">
                    <span className="text-xs font-medium text-[#639922] uppercase tracking-wide">
                      {product.category}
                    </span>
                    <h4 className="text-base font-semibold text-[#5F5E5A] mt-0.5 group-hover:text-[#D85A30] transition-colors">
                      {product.name}
                    </h4>
                    <Link
                      href="/sellers"
                      className="text-xs text-[#D85A30] hover:underline"
                    >
                      by {product.seller}
                    </Link>

                    <div className="mt-2">
                      <StarRating rating={product.rating} />
                      <span className="text-xs text-[#5F5E5A] opacity-50">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-[#D85A30] font-bold text-lg">
                        ${product.price.toFixed(2)}
                      </span>
                      <button className="rounded-full bg-[#D85A30] px-4 py-2 text-xs text-white transition-colors hover:bg-[#BA7517]" onClick={() => { setSelectedProduct(product);}}>
                        Details
                      </button>
                      <button onClick={() => addToCart(product)} className="rounded-full bg-[#D85A30] px-4 py-2 text-xs text-white transition-colors hover:bg-[#BA7517]">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
            onClick={() => setSelectedProduct(null)}
          >
          <div   
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-xl transform transition-all duration-300 scale-100 sm:p-6"
  onClick={(e) => e.stopPropagation()}
            >

            <div className="mb-4 flex items-start justify-between gap-4">
              <p className="text-sm uppercase tracking-wider text-[#D85A30] font-semibold">
                Product Details
              </p>

              <h2 className="text-xl font-bold text-[#5F5E5A] sm:text-2xl">
                {selectedProduct.name}
              </h2>

              <button
                onClick={() => setSelectedProduct(null)}
                className="text-xl font-bold text-gray-500 hover:text-black"
              >
                x
              </button>
            </div>

            <div className="my-8 flex justify-center sm:m-10">
              <div className="text-8xl">
                {selectedProduct.emoji}
              </div>
            </div>

            <p className="text-gray-600 mb-4">
              {selectedProduct.description}
            </p>

            <div className="space-y-3 text-[#5F5E5A]">
              <div className="flex items-center gap-2">
                <span>🪵</span>
                <span>
                  <strong className="text-[#D85A30]">Materials:</strong>{" "}
                  {selectedProduct.materials}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>📦</span>
                <span>
                  <strong className="text-[#D85A30]">Stock:</strong>{" "}
                  {selectedProduct.stock}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span>🚚</span>
                <span>
                  <strong className="text-[#D85A30]">Shipping:</strong>{" "}
                  {selectedProduct.shippingTime}
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-2xl font-bold text-[#D85A30]">
                ${selectedProduct.price.toFixed(2)}
              </span>

              <button 
              onClick={() => addToCart(selectedProduct)} 
              className="rounded-full bg-[#D85A30] px-4 py-2 text-center text-white hover:bg-[#BA7517]"
              >
                Add to Cart
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12 w-full bg-[#5F5E5A] px-4 py-6 text-center text-sm text-white">
        <p>© 2025 Handcrafted Haven · WDD 430 Web Full-Stack Development · BYU-Idaho</p>
        <p className="mt-1 text-white/60">Javiera Lorca Jimenez · Rony Reyes</p>
      </footer>

    </div>
  );
}




