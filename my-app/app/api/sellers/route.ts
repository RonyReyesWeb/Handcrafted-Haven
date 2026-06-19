// app/api/sellers/route.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const sellers = await prisma.seller.findMany({
    include: {
      products: true,
    },
  });

  return Response.json(sellers);
}