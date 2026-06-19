"use client";

const SELLERS = [
    {
        name: "Maria G.",
        story: "I create handcrafted baskets using sustainable natural fibers.",
    },
    {
        name: "Javiera L.",
        story: "I enjoy designing unique handmade products inspired by everyday life.",
    },
    {
        name: "Rony R.",
        story: "I specialize in knitted apparel and traditional artisan techniques.",
    },
    {
        name: "Ana P.",
        story: "I create nature-inspired jewelry using handcrafted methods.",
    },
];

export default function SellersPage() {
    return (
        <div className="min-h-screen bg-[#F1EFE8] p-8">
            <h1 className="text-4xl font-bold text-[#D85A30] mb-8">
                Our Artisans
            </h1>

            <div className="grid gap-6 md:grid-cols-2">
                {SELLERS.map((seller) => (
                    <div
                        key={seller.name}
                        className="bg-white p-6 rounded-2xl shadow-sm"
                    >
                        <div className="text-5xl mb-4">👩‍🎨</div>

                        <h2 className="text-xl font-bold text-[#5F5E5A]">
                            {seller.name}
                        </h2>

                        <p className="mt-2 text-gray-600">
                            {seller.story}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}