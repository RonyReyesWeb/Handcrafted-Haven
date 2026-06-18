"use client";

import { useState, useSyncExternalStore } from "react";

type CartItem = {
    id: number;
    name: string;
    price: number;
    category: string;
    seller: string;
    emoji: string;
    quantity: number;
};

function getCartSnapshot() {
    if (typeof window === "undefined") return "[]";
    return localStorage.getItem("cart") ?? "[]";
}

function subscribeToCart(callback: () => void) {
    window.addEventListener("storage", callback);
    window.addEventListener("cart-updated", callback);

    return () => {
        window.removeEventListener("storage", callback);
        window.removeEventListener("cart-updated", callback);
    };
}

export default function CheckoutPage() {
    const [orderPlaced, setOrderPlaced] = useState(false);

    const cartSnapshot = useSyncExternalStore(
        subscribeToCart,
        getCartSnapshot,
        () => "[]"
    );

    const cart = JSON.parse(cartSnapshot) as CartItem[];

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    function placeOrder() {
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cart-updated"));
        setOrderPlaced(true);
    }

    if (orderPlaced) {
        return (
            <main className="min-h-screen bg-[#F1EFE8] px-4 py-8 sm:px-8 sm:py-10">
                <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
                    <h1 className="text-3xl font-bold text-[#D85A30] sm:text-4xl">
                        Order Confirmed
                    </h1>
                    <p className="mt-3 text-[#5F5E5A]">
                        Thank you for your purchase. This is a simulated checkout for now.
                    </p>

                    <a
                        href="/shop"
                        className="mt-6 inline-block rounded-full bg-[#D85A30] px-6 py-3 text-sm font-semibold text-white hover:bg-[#BA7517]"
                    >
                        Back to Shop
                    </a>
                </div>
            </main>
        );
    }

    if (cart.length === 0) {
        return (
            <main className="min-h-screen bg-[#F1EFE8] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
                    <h1 className="text-3xl font-bold text-[#D85A30] sm:text-4xl">Checkout</h1>
                    <p className="mt-3 text-[#5F5E5A]">
                        Your cart is empty. Add products before checking out.
                    </p>

                    <a
                        href="/shop"
                        className="mt-6 inline-block rounded-full bg-[#D85A30] px-6 py-3 text-sm font-semibold text-white hover:bg-[#BA7517]"
                    >
                        Continue Shopping
                    </a>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F1EFE8] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
            <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_360px] lg:gap-8">
                <section className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                    <h1 className="text-3xl font-bold text-[#D85A30] sm:text-4xl">Checkout</h1>

                    <div className="mt-6 grid gap-4">
                        <input
                            placeholder="Full name"
                            className="rounded-xl border border-[#E0DDD6] px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30]"
                        />

                        <input
                            placeholder="Email"
                            type="email"
                            className="rounded-xl border border-[#E0DDD6] px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30]"
                        />

                        <input
                            placeholder="Shipping address"
                            className="rounded-xl border border-[#E0DDD6] px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30]"
                        />

                        <select className="rounded-xl border border-[#E0DDD6] px-4 py-3 text-sm text-[#5F5E5A] outline-none focus:ring-2 focus:ring-[#D85A30]">
                            <option>Credit Card</option>
                            <option>PayPal</option>
                            <option>Cash on Delivery</option>
                        </select>
                    </div>
                </section>

                <aside className="rounded-2xl bg-white p-5 shadow-sm sm:p-6">
                    <h2 className="text-xl font-bold text-[#5F5E5A]">Order Summary</h2>

                    <div className="mt-4 grid gap-3">
                        {cart.map((item) => (
                            <div key={item.id} className="flex flex-col gap-1 text-sm sm:flex-row sm:justify-between sm:gap-4">
                                <span className="text-[#5F5E5A]">
                                    {item.emoji} {item.name} x {item.quantity}
                                </span>
                                <span className="font-semibold text-[#D85A30]">
                                    ${(item.price * item.quantity).toFixed(2)}
                                </span>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-6 flex justify-between border-t border-[#E0DDD6] pt-4 text-lg font-bold">
                        <span className="text-[#5F5E5A]">Total</span>
                        <span className="text-[#D85A30]">${total.toFixed(2)}</span>
                    </div>
                    
                    <button
                        onClick={placeOrder}
                        className="mt-6 w-full rounded-full bg-[#D85A30] px-6 py-3 text-sm font-semibold text-white hover:bg-[#BA7517]"
                    >
                        Place Order
                    </button>
                </aside>
            </div>
        </main>
    );
}