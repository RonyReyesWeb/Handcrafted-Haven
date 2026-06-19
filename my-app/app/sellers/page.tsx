"use client";

import Link from "next/link";

const SELLERS = [
  {
    name: "Maria G.",
    story: "I create handcrafted baskets using sustainable natural fibers.",
    specialty: "Basket Weaving",
    emoji: "🧺",
  },
  {
    name: "Javiera L.",
    story: "I enjoy designing unique handmade products inspired by everyday life.",
    specialty: "Home Decor",
    emoji: "🏡",
  },
  {
    name: "Rony R.",
    story: "I specialize in knitted apparel and traditional artisan techniques.",
    specialty: "Knitting",
    emoji: "🧶",
  },
  {
    name: "Ana P.",
    story: "I create nature-inspired jewelry using handcrafted methods.",
    specialty: "Jewelry",
    emoji: "💍",
  },
];

export default function SellersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F1EFE8]">
        <header className="w-full bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-2xl font-bold text-[#D85A30]">
            Handcrafted Haven
          </Link>
          <nav className="flex flex-wrap gap-4 text-sm font-medium text-[#5F5E5A] sm:gap-6">
            <Link href="/" className="hover:text-[#D85A30]  font-semibold transition-colors">Home</Link>
            <Link href="/shop" className="hover:text-[#D85A30] transition-colors">Shop</Link>
            <Link href="/sellers" className="text-[#D85A30] transition-colors">Sellers</Link>
            <Link href="/sell/new" className="hover:text-[#D85A30] transition-colors">Sell</Link>
            <Link
              href="/cart"
              className="relative hover:text-[#D85A30] transition-colors"
            >
              Cart
            </Link>
          </nav>
        </div>
      </header>
      {/* Hero */}
      <section className="bg-[#D85A30] px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Meet Our Artisans
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
          Behind every handcrafted product is a talented artisan
          dedicated to preserving creativity, quality, and tradition.
        </p>
      </section>

      {/* Stats */}
      <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-[#D85A30]">50+</h2>
          <p className="mt-2 text-[#5F5E5A]">Handcrafted Products</p>
        </div>

        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-[#D85A30]">20+</h2>
          <p className="mt-2 text-[#5F5E5A]">Local Artisans</p>
        </div>

        <div className="rounded-2xl bg-white p-6 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-[#D85A30]">100%</h2>
          <p className="mt-2 text-[#5F5E5A]">Handmade Creations</p>
        </div>
      </section>

      {/* Sellers */}
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SELLERS.map((seller) => (
            <div
              key={seller.name}
              className="overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="h-24 bg-[#D85A30]" />

              <div className="relative p-5">
                <div className="absolute -top-10 left-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#F1EFE8] text-4xl shadow-sm">
                  {seller.emoji}
                </div>

                <div className="pt-12">
                  <h2 className="text-xl font-semibold text-[#5F5E5A]">
                    {seller.name}
                  </h2>

                  <span className="mt-2 inline-block rounded-full bg-[#F1EFE8] px-3 py-1 text-xs font-medium text-[#D85A30]">
                    {seller.specialty}
                  </span>

                  <p className="mt-4 text-sm leading-relaxed text-[#5F5E5A]">
                    {seller.story}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* CTA */}
      <section className="bg-white px-4 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#5F5E5A]">
          Are you an artisan?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-[#5F5E5A]">
          Join our community and showcase your unique handmade creations
          to customers looking for authentic craftsmanship.
        </p>

        <a
          href="/sell/new"
          className="mt-6 inline-block rounded-full bg-[#D85A30] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#BA7517]"
        >
          Become a Seller
        </a>
      </section>

      {/* Footer */}
      <footer className="mt-auto w-full bg-[#5F5E5A] px-4 py-6 text-center text-sm text-white">
        <p>
          © 2025 Handcrafted Haven · WDD 430 Web Full-Stack Development ·
          BYU-Idaho
        </p>
        <p className="mt-1 text-white/60">
          Javiera Lorca Jimenez · Rony Reyes
        </p>
      </footer>
    </div>
  );
}