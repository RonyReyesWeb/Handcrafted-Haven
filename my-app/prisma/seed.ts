  import { PrismaClient } from "@prisma/client";

  const prisma = new PrismaClient();

  async function main() {

    await prisma.review.deleteMany();
    await prisma.product.deleteMany();
    await prisma.seller.deleteMany();

    const sellers = {
      maria: await prisma.seller.create({
        data: {
          name: "Maria G.",
          bio: "Basket artisan"
        }
      }),

      javiera: await prisma.seller.create({
        data: {
          name: "Javiera L.",
          bio: "Ceramic and textile artisan"
        }
      }),

      rony: await prisma.seller.create({
        data: {
          name: "Rony R.",
          bio: "Knitted apparel artisan"
        }
      }),

      ana: await prisma.seller.create({
        data: {
          name: "Ana P.",
          bio: "Jewelry artisan"
        }
      }),

      carlos: await prisma.seller.create({
        data: {
          name: "Carlos M.",
          bio: "Artist and illustrator"
        }
      }),

      sofia: await prisma.seller.create({
        data: {
          name: "Sofia R.",
          bio: "Natural beauty artisan"
        }
      }),

      pedro: await prisma.seller.create({
        data: {
          name: "Pedro A.",
          bio: "Wood crafts artisan"
        }
      }),

      lucia: await prisma.seller.create({
        data: {
          name: "Lucia V.",
          bio: "Macrame artisan"
        }
      }),
    };

    await prisma.product.createMany({
      data: [
        {
          name: "Handwoven Basket",
          price: 45,
          category: "Home Decor",
          emoji: "🧺",
          description: "A beautifully handwoven basket made from sustainable natural fibers.",
          materials: "Natural palm fibers",
          stock: 15,
          shippingTime: "3-5 business days",
          rating: 4.8,
          sellerId: sellers.maria.id,
        },

        {
          name: "Ceramic Mug Set",
          price: 38,
          category: "Kitchen",
          emoji: "☕",
          description: "A charming set of handmade ceramic mugs.",
          materials: "Hand-fired ceramic",
          stock: 12,
          shippingTime: "2-4 business days",
          rating: 4.5,
          sellerId: sellers.javiera.id,
        },

        {
          name: "Knitted Scarf",
          price: 52,
          category: "Apparel",
          emoji: "🧣",
          description: "Soft, cozy handmade scarf.",
          materials: "Premium wool blend",
          stock: 8,
          shippingTime: "1-3 business days",
          rating: 5,
          sellerId: sellers.rony.id,
        },

        {
          name: "Silver Leaf Ring",
          price: 29,
          category: "Jewelry",
          emoji: "💍",
          description: "Elegant sterling silver ring.",
          materials: "925 sterling silver",
          stock: 20,
          shippingTime: "3-7 business days",
          rating: 4.7,
          sellerId: sellers.ana.id,
        },

        {
          name: "Watercolor Print",
          price: 65,
          category: "Art & Prints",
          emoji: "🎨",
          description: "Vibrant watercolor print.",
          materials: "Archival art paper",
          stock: 25,
          shippingTime: "2-5 business days",
          rating: 4.9,
          sellerId: sellers.carlos.id,
        },

        {
          name: "Lavender Soap Bar",
          price: 18,
          category: "Bath & Beauty",
          emoji: "🧼",
          description: "Natural lavender soap.",
          materials: "Natural oils and lavender extract",
          stock: 40,
          shippingTime: "1-2 business days",
          rating: 4.6,
          sellerId: sellers.sofia.id,
        },

        {
          name: "Wooden Puzzle",
          price: 34,
          category: "Toys & Games",
          emoji: "🧩",
          description: "Handcrafted wooden puzzle.",
          materials: "Sustainably sourced wood",
          stock: 18,
          shippingTime: "2-4 business days",
          rating: 4.4,
          sellerId: sellers.pedro.id,
        },

        {
          name: "Macramé Wall Art",
          price: 78,
          category: "Home Decor",
          emoji: "🪢",
          description: "Decorative macramé wall hanging.",
          materials: "Cotton cord",
          stock: 10,
          shippingTime: "4-6 business days",
          rating: 4.8,
          sellerId: sellers.lucia.id,
        },

        {
          name: "Hand-dyed Tote Bag",
          price: 42,
          category: "Apparel",
          emoji: "👜",
          description: "Reusable hand-dyed tote bag.",
          materials: "Organic cotton",
          stock: 22,
          shippingTime: "2-4 business days",
          rating: 4.3,
          sellerId: sellers.javiera.id,
        },
      ],
    });
  }

  main()
    .then(() => console.log("Database seeded"))
    .catch(console.error)
    .finally(() => prisma.$disconnect());