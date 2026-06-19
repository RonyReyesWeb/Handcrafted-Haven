"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Seller = {
  id: number;
  name: string;
  bio: string;
  specialty: string;
  emoji: string;
  story: string;
};

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);

  useEffect(() => {
    fetch("/api/sellers")
      .then((res) => res.json())
      .then((data) => setSellers(data))
      .catch(console.error);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#F1EFE8]">
      <header className="w-full bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-2xl font-bold text-[#B54725]">
            Handcrafted Haven
          </Link>

          <nav className="flex flex-wrap gap-4 text-sm font-medium text-[#5F5E5A] sm:gap-6">
            <Link
              href="/"
              className="hover:text-[#B54725] font-semibold transition-colors"
            >
              Home
            </Link>

            <Link
              href="/shop"
              className="hover:text-[#B54725] transition-colors"
            >
              Shop
            </Link>

            <Link
              href="/sellers"
              className="text-[#B54725] transition-colors"
            >
              Sellers
            </Link>

            <Link
              href="/sell/new"
              className="hover:text-[#B54725] transition-colors"
            >
              Sell
            </Link>

            <Link
              href="/cart"
              className="hover:text-[#B54725] transition-colors"
            >
              Cart
            </Link>
          </nav>
        </div>
      </header>

      <section className="bg-[#D85A30] px-4 py-16 text-center text-white">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Meet Our Artisans
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-white">
          Behind every handcrafted product is a talented artisan dedicated
          to preserving creativity, quality, and tradition.
        </p>
      </section>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sellers.map((seller) => (
            <div
              key={seller.id}
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

                  <span className="mt-2 inline-block rounded-full bg-[#F1EFE8] px-3 py-1 text-xs font-medium text-[#A6401F]">
                    {seller.specialty}
                  </span>

                  <p className="mt-4 text-sm leading-relaxed text-[#5F5E5A]">
                    {seller.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-auto w-full bg-[#5F5E5A] px-4 py-6 text-center text-sm text-white">
        <p>
          © 2025 Handcrafted Haven · WDD 430 Web Full-Stack Development ·
          BYU-Idaho
        </p>

        <p className="mt-1 text-white/80">
          Javiera Lorca Jimenez · Rony Reyes
        </p>
      </footer>
    </div>
  );
}