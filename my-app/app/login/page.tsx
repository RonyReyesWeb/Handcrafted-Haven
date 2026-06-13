"use client";

import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.password) newErrors.password = "Password is required.";
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
          <div className="text-6xl mb-4">👋</div>
          <h2 className="text-2xl font-bold text-[#D85A30] mb-2">
            Welcome back!
          </h2>
          <p className="text-[#5F5E5A] mb-6">
            You're logged in as <span className="font-semibold">{form.email}</span>.
          </p>
          <a
            href="/"
            className="inline-block bg-[#D85A30] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#BA7517] transition-colors"
          >
            Go to Homepage
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
          <a href="/register" className="hover:text-[#D85A30] transition-colors">Sign Up</a>
        </nav>
      </header>

      {/* Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="bg-white rounded-3xl shadow-sm p-8 max-w-md w-full">

          <h1 className="text-3xl font-bold text-[#5F5E5A] mb-1 text-center">
            Welcome Back
          </h1>
          <p className="text-[#5F5E5A] text-sm opacity-70 text-center mb-8">
            Log in to your Handcrafted Haven account.
          </p>

          <div className="flex flex-col gap-5">

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
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-[#5F5E5A]">
                  Password <span className="text-[#D85A30]">*</span>
                </label>
                <a href="#" className="text-xs text-[#D85A30] hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`border rounded-xl px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30] transition ${
                  errors.password ? "border-red-400" : "border-[#E0DDD6]"
                }`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="bg-[#D85A30] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#BA7517] transition-colors mt-2"
            >
              Log In
            </button>

            <p className="text-center text-sm text-[#5F5E5A]">
              Don't have an account?{" "}
              <a href="/register" className="text-[#D85A30] font-semibold hover:underline">
                Sign Up
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