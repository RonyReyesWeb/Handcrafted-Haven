"use client";

import { useState } from "react";

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
  { id: 1, name: "Handwoven Basket", price: 45, category: "Home Decor", seller: "Maria G.", rating: 4.8, reviews: 12, emoji: "🧺" },
  { id: 2, name: "Ceramic Mug Set", price: 38, category: "Kitchen", seller: "Javiera L.", rating: 4.5, reviews: 8, emoji: "☕" },
  { id: 3, name: "Knitted Scarf", price: 52, category: "Apparel", seller: "Rony R.", rating: 5.0, reviews: 20, emoji: "🧣" },
  { id: 4, name: "Silver Leaf Ring", price: 29, category: "Jewelry", seller: "Ana P.", rating: 4.7, reviews: 15, emoji: "💍" },
  { id: 5, name: "Watercolor Print", price: 65, category: "Art & Prints", seller: "Carlos M.", rating: 4.9, reviews: 6, emoji: "🎨" },
  { id: 6, name: "Lavender Soap Bar", price: 18, category: "Bath & Beauty", seller: "Sofia R.", rating: 4.6, reviews: 30, emoji: "🧼" },
  { id: 7, name: "Wooden Puzzle", price: 34, category: "Toys & Games", seller: "Pedro A.", rating: 4.4, reviews: 9, emoji: "🧩" },
  { id: 8, name: "Macramé Wall Art", price: 78, category: "Home Decor", seller: "Lucia V.", rating: 4.8, reviews: 17, emoji: "🪢" },
  { id: 9, name: "Hand-dyed Tote Bag", price: 42, category: "Apparel", seller: "Javiera L.", rating: 4.3, reviews: 11, emoji: "👜" },
];

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

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [maxPrice, setMaxPrice] = useState(200);
  const [search, setSearch] = useState("");

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
      <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-[#D85A30]">
          Handcrafted Haven
        </a>
        <nav className="flex gap-6 text-[#5F5E5A] font-medium text-sm">
          <a href="/" className="hover:text-[#D85A30] transition-colors">Home</a>
          <a href="/shop" className="text-[#D85A30] font-semibold transition-colors">Shop</a>
          <a href="/sellers" className="hover:text-[#D85A30] transition-colors">Sellers</a>
          <a href="/sell/new" className="hover:text-[#D85A30] transition-colors">Sell</a>
        </nav>
      </header>

      {/* Hero Banner */}
      <section className="w-full bg-[#D85A30] text-white py-10 px-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Browse the Shop</h1>
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
            className="w-full pl-10 pr-4 py-3 rounded-full text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-white"
          />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-10 flex gap-8 items-start">

        {/* Sidebar Filters */}
        <aside className="w-56 flex-shrink-0 flex flex-col gap-6">

          {/* Category Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <h3 className="text-sm font-bold text-[#5F5E5A] mb-3 uppercase tracking-wide">
              Category
            </h3>
            <ul className="flex flex-col gap-2">
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
        <div className="flex-1">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[#5F5E5A]">
              <span className="font-semibold text-[#D85A30]">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "product" : "products"} found
            </p>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-[#E0DDD6] rounded-xl px-4 py-2 text-sm text-[#5F5E5A] bg-white outline-none focus:ring-2 focus:ring-[#D85A30]"
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
                <a
                  key={product.id}
                  href={`/shop/${product.id}`}
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
                    <p className="text-xs text-[#5F5E5A] opacity-60 mt-0.5">
                      by {product.seller}
                    </p>

                    <div className="mt-2">
                      <StarRating rating={product.rating} />
                      <span className="text-xs text-[#5F5E5A] opacity-50">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-[#D85A30] font-bold text-lg">
                        ${product.price.toFixed(2)}
                      </span>
                      <button className="text-xs bg-[#D85A30] text-white px-4 py-1.5 rounded-full hover:bg-[#BA7517] transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#5F5E5A] text-white text-center py-6 text-sm mt-12">
        <p>© 2025 Handcrafted Haven · WDD 430 Web Full-Stack Development · BYU-Idaho</p>
        <p className="mt-1 text-white/60">Javiera Lorca Jimenez · Rony Reyes</p>
      </footer>

    </div>
  );
}