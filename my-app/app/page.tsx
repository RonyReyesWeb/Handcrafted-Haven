export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F1EFE8] font-sans">
      {/* Navigation */}
      <header className="w-full bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-[#D85A30]">
            Handcrafted Haven
          </h1>
          <nav className="flex flex-wrap gap-4 text-sm font-medium text-[#5F5E5A] sm:gap-6 sm:text-base">
            <a href="#" className="hover:text-[#D85A30] transition-colors">Home</a>
            <a href="/shop" className="hover:text-[#D85A30] transition-colors">Shop</a>
            <a href="#" className="hover:text-[#D85A30] transition-colors">Sellers</a>
            <a href="#" className="hover:text-[#D85A30] transition-colors">About</a>
          </nav>
        </div>
      </header>

      <main className="flex w-full flex-col items-center">
        {/* Hero Section */}
        <section className="flex w-full flex-col items-center justify-center bg-[#D85A30] px-4 py-16 text-center text-white sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <h2 className="mb-4 max-w-xl text-3xl font-bold leading-tight sm:text-4xl">
            Discover Unique Handcrafted Treasures
          </h2>
          <p className="mb-8 max-w-lg text-base opacity-90 sm:text-lg">
            Connect with talented artisans and find one-of-a-kind handmade items
            crafted with passion and care.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
            <a
              href="/shop"
              className="rounded-full bg-white px-6 py-3 text-center font-semibold text-[#D85A30] transition-colors hover:bg-[#F1EFE8]"
            >
              Shop Now
            </a>
            <a
              href="/sell/new"
              className="rounded-full border border-white px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-white hover:text-[#D85A30]"
            >
              Become a Seller
            </a>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="w-full max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <h3 className="mb-8 text-center text-2xl font-semibold text-[#5F5E5A]">
            Featured Products
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Handwoven Basket", price: "$45.00", category: "Home Decor" },
              { name: "Ceramic Mug Set", price: "$38.00", category: "Kitchen" },
              { name: "Knitted Scarf", price: "$52.00", category: "Apparel" },
            ].map((product) => (
              <div
                key={product.name}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-48 w-full items-center justify-center bg-[#F1EFE8] text-4xl text-[#BA7517]">
                  🧺
                </div>
                <div className="p-4">
                  <span className="text-xs font-medium uppercase tracking-wide text-[#639922]">
                    {product.category}
                  </span>
                  <h4 className="mt-1 text-lg font-semibold text-[#5F5E5A]">
                    {product.name}
                  </h4>
                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="font-bold text-[#D85A30]">{product.price}</span>
                    <a
                      href="/shop"
                      className="rounded-full bg-[#D85A30] px-4 py-2 text-center text-sm text-white transition-colors hover:bg-[#BA7517]"
                    >
                      View Product
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Handcrafted Haven Section */}
        <section className="w-full bg-white px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-5xl text-center">
            <h3 className="mb-10 text-2xl font-semibold text-[#5F5E5A]">
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
                  <p className="text-sm leading-relaxed text-[#5F5E5A]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto w-full bg-[#5F5E5A] px-4 py-6 text-center text-sm text-white">
        <p>Ã‚Â© 2025 Handcrafted Haven Ã‚Â· WDD 430 Web Full-Stack Development Ã‚Â· BYU-Idaho</p>
        <p className="mt-1 text-white/60">Javiera Lorca Jimenez Ã‚Â· Rony Reyes</p>
      </footer>
    </div>
  );
}