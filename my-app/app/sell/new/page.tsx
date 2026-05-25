"use client";

import { useState } from "react";

const CATEGORIES = [
  "Home Decor",
  "Kitchen",
  "Apparel",
  "Jewelry",
  "Toys & Games",
  "Art & Prints",
  "Bath & Beauty",
  "Other",
];

export default function NewListingPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
  });
  const [imageName, setImageName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setImageName(file.name);
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Product name is required.";
    if (!form.description.trim())
      newErrors.description = "Description is required.";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0)
      newErrors.price = "Enter a valid price.";
    if (!form.category) newErrors.category = "Please select a category.";
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0)
      newErrors.stock = "Enter a valid stock quantity.";
    return newErrors;
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F1EFE8] flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-md p-12 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-[#D85A30] mb-2">
            Listing Created!
          </h2>
          <p className="text-[#5F5E5A] mb-6">
            <span className="font-semibold">{form.name}</span> has been added to
            your shop.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setForm({
                  name: "",
                  description: "",
                  price: "",
                  category: "",
                  stock: "",
                });
                setImageName(null);
                setSubmitted(false);
              }}
              className="bg-[#D85A30] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#BA7517] transition-colors"
            >
              Add Another Product
            </button>
            <a
              href="/dashboard/listings"
              className="text-[#5F5E5A] underline text-sm hover:text-[#D85A30] transition-colors"
            >
              Go to My Listings
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1EFE8] font-sans">

      {/* Header */}
      <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-[#D85A30]">
          Handcrafted Haven
        </a>
        <nav className="flex gap-6 text-[#5F5E5A] font-medium text-sm">
          <a href="/" className="hover:text-[#D85A30] transition-colors">Home</a>
          <a href="/shop" className="hover:text-[#D85A30] transition-colors">Shop</a>
          <a href="/sellers" className="hover:text-[#D85A30] transition-colors">Sellers</a>
          <a href="/dashboard/listings" className="hover:text-[#D85A30] transition-colors font-semibold text-[#D85A30]">
            My Listings
          </a>
        </nav>
      </header>

      {/* Page Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">

        {/* Breadcrumb */}
        <p className="text-sm text-[#5F5E5A] mb-2">
          <a href="/dashboard/listings" className="hover:text-[#D85A30] transition-colors">
            My Listings
          </a>{" "}
          / <span className="text-[#D85A30] font-medium">New Product</span>
        </p>

        <h1 className="text-3xl font-bold text-[#5F5E5A] mb-1">
          Create a New Listing
        </h1>
        <p className="text-[#5F5E5A] text-sm mb-8 opacity-70">
          Fill in the details below to add a product to your shop.
        </p>

        <div className="bg-white rounded-3xl shadow-sm p-8 flex flex-col gap-6">

          {/* Product Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#5F5E5A]">
              Product Name <span className="text-[#D85A30]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Hand-painted Ceramic Bowl"
              className={`border rounded-xl px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30] transition ${
                errors.name ? "border-red-400" : "border-[#E0DDD6]"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#5F5E5A]">
              Description <span className="text-[#D85A30]">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your product: materials used, dimensions, what makes it special..."
              className={`border rounded-xl px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30] resize-none transition ${
                errors.description ? "border-red-400" : "border-[#E0DDD6]"
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#5F5E5A]">
              Category <span className="text-[#D85A30]">*</span>
            </label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className={`border rounded-xl px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30] bg-white transition ${
                errors.category ? "border-red-400" : "border-[#E0DDD6]"
              }`}
            >
              <option value="">Select a category...</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category}</p>
            )}
          </div>

          {/* Price & Stock */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-semibold text-[#5F5E5A]">
                Price (USD) <span className="text-[#D85A30]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5F5E5A] text-sm">
                  $
                </span>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`border rounded-xl pl-8 pr-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30] w-full transition ${
                    errors.price ? "border-red-400" : "border-[#E0DDD6]"
                  }`}
                />
              </div>
              {errors.price && (
                <p className="text-red-500 text-xs">{errors.price}</p>
              )}
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-semibold text-[#5F5E5A]">
                Stock Quantity <span className="text-[#D85A30]">*</span>
              </label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="e.g. 10"
                min="0"
                className={`border rounded-xl px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30] transition ${
                  errors.stock ? "border-red-400" : "border-[#E0DDD6]"
                }`}
              />
              {errors.stock && (
                <p className="text-red-500 text-xs">{errors.stock}</p>
              )}
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-semibold text-[#5F5E5A]">
              Product Image
            </label>
            <label className="border-2 border-dashed border-[#E0DDD6] rounded-xl px-4 py-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#D85A30] transition-colors group">
              <span className="text-3xl mb-2">📷</span>
              <span className="text-sm text-[#5F5E5A] group-hover:text-[#D85A30] transition-colors">
                {imageName ? imageName : "Click to upload an image"}
              </span>
              <span className="text-xs text-[#5F5E5A] opacity-50 mt-1">
                PNG, JPG, WEBP up to 5MB
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImage}
              />
            </label>
          </div>

          {/* Divider */}
          <hr className="border-[#E0DDD6]" />

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <a
              href="/dashboard/listings"
              className="px-6 py-3 rounded-full border border-[#E0DDD6] text-sm font-medium text-[#5F5E5A] hover:border-[#D85A30] hover:text-[#D85A30] transition-colors"
            >
              Cancel
            </a>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 rounded-full bg-[#D85A30] text-white text-sm font-semibold hover:bg-[#BA7517] transition-colors"
            >
              Publish Listing
            </button>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#5F5E5A] text-white text-center py-6 text-sm mt-12">
        <p>© 2025 Handcrafted Haven · WDD 430 Web Full-Stack Development · BYU-Idaho</p>
        <p className="mt-1 text-white/60">Javiera Lorca Jimenez · Rony Reyes</p>
      </footer>

    </div>
  );
}