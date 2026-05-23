export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F1EFE8] font-sans">

      {/* Navigation */}
      <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#D85A30]">Handcrafted Haven</h1>
        <nav className="flex gap-6 text-[#5F5E5A] font-medium">
          <a href="#" className="hover:text-[#D85A30] transition-colors">Home</a>
          <a href="#" className="hover:text-[#D85A30] transition-colors">Shop</a>
          <a href="#" className="hover:text-[#D85A30] transition-colors">Sellers</a>
          <a href="#" className="hover:text-[#D85A30] transition-colors">About</a>
        </nav>
      </header>

      <main className="flex flex-col items-center w-full">

        {/* Hero Section */}
        <section className="w-full bg-[#D85A30] text-white flex flex-col items-center justify-center py-24 px-8 text-center">
          <h2 className="text-4xl font-bold mb-4 max-w-xl leading-tight">
            Discover Unique Handcrafted Treasures
          </h2>
          <p className="text-lg max-w-lg mb-8 opacity-90">
            Connect with talented artisans and find one-of-a-kind handmade items
            crafted with passion and care.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <a
              href="#"
              className="bg-white text-[#D85A30] font-semibold px-6 py-3 rounded-full hover:bg-[#F1EFE8] transition-colors"
            >
              Shop Now
            </a>
            <a
              href="#"
              className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-[#D85A30] transition-colors"
            >
              Become a Seller
            </a>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="w-full max-w-5xl px-8 py-16">
          <h3 className="text-2xl font-semibold text-[#5F5E5A] mb-8 text-center">
            Featured Products
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[
              { name: "Handwoven Basket", price: "$45.00", category: "Home Decor" },
              { name: "Ceramic Mug Set", price: "$38.00", category: "Kitchen" },
              { name: "Knitted Scarf", price: "$52.00", category: "Apparel" },
            ].map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Placeholder image area */}
                <div className="w-full h-48 bg-[#F1EFE8] flex items-center justify-center text-[#BA7517] text-4xl">
                  🧺
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium text-[#639922] uppercase tracking-wide">
                    {product.category}
                  </span>
                  <h4 className="text-lg font-semibold text-[#5F5E5A] mt-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-[#D85A30] font-bold">{product.price}</span>
                    <button className="text-sm bg-[#D85A30] text-white px-4 py-1 rounded-full hover:bg-[#BA7517] transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Handcrafted Haven Section */}
        <section className="w-full bg-white py-16 px-8">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-2xl font-semibold text-[#5F5E5A] mb-10">
              Why Handcrafted Haven?
            </h3>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                { icon: "🤝", title: "Support Artisans", desc: "Every purchase directly supports independent makers and their craft." },
                { icon: "🌱", title: "Sustainable", desc: "Handmade products promote conscious, sustainable consumption." },
                { icon: "✨", title: "Unique Finds", desc: "Discover one-of-a-kind items you won't find anywhere else." },
              ].map((item) => (
                <div key={item.title} className="flex flex-col items-center gap-3">
                  <span className="text-4xl">{item.icon}</span>
                  <h4 className="text-lg font-semibold text-[#D85A30]">{item.title}</h4>
                  <p className="text-[#5F5E5A] text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#5F5E5A] text-white text-center py-6 text-sm mt-auto">
        <p>© 2025 Handcrafted Haven · WDD 430 Web Full-Stack Development · BYU-Idaho</p>
        <p className="mt-1 text-white/60">Javiera Lorca Jimenez · Rony Reyes</p>
      </footer>

    </div>
  );
}