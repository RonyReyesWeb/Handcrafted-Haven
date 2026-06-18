"use client";

import { useSyncExternalStore } from "react";

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

function saveCart(updatedCart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  window.dispatchEvent(new Event("cart-updated"));
}

export default function CartPage() {
  const cartSnapshot = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    () => "[]"
  );

  const cart = JSON.parse(cartSnapshot) as CartItem[];

  function removeFromCart(productId: number) {
    const updatedCart = cart.filter((item) => item.id !== productId);
    saveCart(updatedCart);
  }

  function increaseQuantity(productId: number) {
    const updatedCart = cart.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    saveCart(updatedCart);
  }

  function decreaseQuantity(productId: number) {
    const updatedCart = cart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  }

  function clearCart() {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart-updated"));
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-[#F1EFE8] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#BA7517]">
              Shopping Cart
            </p>
            <h1 className="text-3xl font-bold text-[#D85A30] sm:text-4xl">
              Your Cart
            </h1>
          </div>

          <a
            href="/shop"
            className="w-full rounded-full border border-[#D85A30] px-5 py-2.5 text-center text-sm font-semibold text-[#D85A30] hover:bg-[#D85A30] hover:text-white sm:w-auto"
          >
            Continue Shopping
          </a>
        </div>

        {cart.length === 0 ? (
          <div className="mt-6 rounded-2xl bg-white p-6 text-center shadow-sm sm:p-8">
            <p className="text-[#5F5E5A]">Your cart is empty for now.</p>

            <a
              href="/shop"
              className="mt-6 inline-block rounded-full bg-[#D85A30] px-6 py-3 text-sm font-semibold text-white hover:bg-[#BA7517]"
            >
              Browse Products
            </a>
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm sm:p-5 md:flex-row md:items-center md:justify-between"
              >
                <div className="flex min-w-0 items-start gap-4 sm:items-center">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F1EFE8] text-3xl sm:h-16 sm:w-16 sm:text-4xl">
                    {item.emoji}
                  </span>

                  <div className="min-w-0">
                    <h2 className="font-semibold text-[#5F5E5A]">
                      {item.name}
                    </h2>
                    <p className="text-sm text-[#5F5E5A]/70">
                      {item.category} - by {item.seller}
                    </p>
                    <p className="text-sm font-semibold text-[#D85A30]">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D85A30] text-lg leading-none text-[#D85A30] hover:bg-[#D85A30] hover:text-white"
                        aria-label={`Decrease ${item.name} quantity`}
                      >
                        -
                      </button>

                      <span className="min-w-8 text-center text-sm font-semibold text-[#5F5E5A]">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D85A30] text-lg leading-none text-[#D85A30] hover:bg-[#D85A30] hover:text-white"
                        aria-label={`Increase ${item.name} quantity`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 md:flex-col md:items-end">
                  <span className="font-bold text-[#D85A30] md:text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-full border border-[#D85A30] px-4 py-2 text-sm font-semibold text-[#D85A30] hover:bg-[#D85A30] hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center justify-between text-lg font-bold text-[#5F5E5A]">
                <span>Total</span>
                <span className="text-[#D85A30]">${total.toFixed(2)}</span>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="/shop"
                  className="rounded-full border border-[#D85A30] px-6 py-3 text-center text-sm font-semibold text-[#D85A30] hover:bg-[#D85A30] hover:text-white"
                >
                  Continue Shopping
                </a>

                <button
                  onClick={clearCart}
                  className="rounded-full bg-[#5F5E5A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#44433f]"
                >
                  Clear Cart
                </button>

                <a
                  href="/checkout"
                  className="rounded-full bg-[#D85A30] px-6 py-3 text-center text-sm font-semibold text-white hover:bg-[#BA7517] sm:ml-auto"
                >
                  Checkout
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
