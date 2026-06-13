"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "buyer",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
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
      <div className="min-h-screen bg-[#F1EFE8] flex items-center justify-center px-4 font-sans">
        <div className="bg-white rounded-3xl shadow-md p-12 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-[#D85A30] mb-2">
            Welcome, {form.name.split(" ")[0]}!
          </h2>
          <p className="text-[#5F5E5A] mb-6">
            Your account has been created as a{" "}
            <span className="font-semibold">
              {form.role === "seller" ? "Seller" : "Buyer"}
            </span>
            . You can now log in to Handcrafted Haven.
          </p>
          <a
            href="/login"
            className="inline-block bg-[#D85A30] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#BA7517] transition-colors"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1EFE8] font-sans flex flex-col">

      {/* Header */}
      <header className="w-full bg-white shadow-sm py-4 px-8 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-[#D85A30]">
          Handcrafted Haven
        </a>
        <nav className="flex gap-6 text-[#5F5E5A] font-medium text-sm">
          <a href="/" className="hover:text-[#D85A30] transition-colors">Home</a>
          <a href="/shop" className="hover:text-[#D85A30] transition-colors">Shop</a>
          <a href="/login" className="hover:text-[#D85A30] transition-colors">Log In</a>
        </nav>
      </header>

      {/* Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm p-8 max-w-md w-full">

          <h1 className="text-3xl font-bold text-[#5F5E5A] mb-1 text-center">
            Create an Account
          </h1>
          <p className="text-[#5F5E5A] text-sm opacity-70 text-center mb-8">
            Join Handcrafted Haven as a buyer or seller.
          </p>

          <div className="flex flex-col gap-5">

            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#5F5E5A]">
                Full Name <span className="text-[#D85A30]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                className={`border rounded-xl px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30] transition ${
                  errors.name ? "border-red-400" : "border-[#E0DDD6]"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#5F5E5A]">
                Email <span className="text-[#D85A30]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                className={`border rounded-xl px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30] transition ${
                  errors.email ? "border-red-400" : "border-[#E0DDD6]"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#5F5E5A]">
                Password <span className="text-[#D85A30]">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className={`border rounded-xl px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30] transition ${
                  errors.password ? "border-red-400" : "border-[#E0DDD6]"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#5F5E5A]">
                Confirm Password <span className="text-[#D85A30]">*</span>
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`border rounded-xl px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30] transition ${
                  errors.confirmPassword ? "border-red-400" : "border-[#E0DDD6]"
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Role */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-[#5F5E5A]">
                I want to join as
              </label>
              <div className="flex gap-3">
                <label
                  className={`flex-1 border rounded-xl px-4 py-3 text-sm text-center cursor-pointer transition-colors ${
                    form.role === "buyer"
                      ? "border-[#D85A30] bg-[#FCEFE9] text-[#D85A30] font-semibold"
                      : "border-[#E0DDD6] text-[#5F5E5A]"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={form.role === "buyer"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  🛍️ Buyer
                </label>
                <label
                  className={`flex-1 border rounded-xl px-4 py-3 text-sm text-center cursor-pointer transition-colors ${
                    form.role === "seller"
                      ? "border-[#D85A30] bg-[#FCEFE9] text-[#D85A30] font-semibold"
                      : "border-[#E0DDD6] text-[#5F5E5A]"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={form.role === "seller"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  🧵 Seller
                </label>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="bg-[#D85A30] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#BA7517] transition-colors mt-2"
            >
              Create Account
            </button>

            <p className="text-center text-sm text-[#5F5E5A]">
              Already have an account?{" "}
              <a href="/login" className="text-[#D85A30] font-semibold hover:underline">
                Log In
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#5F5E5A] text-white text-center py-6 text-sm">
        <p>© 2025 Handcrafted Haven · WDD 430 Web Full-Stack Development · BYU-Idaho</p>
        <p className="mt-1 text-white/60">Javiera Lorca Jimenez · Rony Reyes</p>
      </footer>

    </div>
  );
}