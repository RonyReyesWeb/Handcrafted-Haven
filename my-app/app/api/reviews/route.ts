import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const reviews = await prisma.review.findMany({
    include: {
      product: true,
    },
  });

  return Response.json(reviews);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const review = await prisma.review.create({
      data: {
        productId: body.productId,
        rating: body.rating,
        comment: body.comment,
      },
    });

    return Response.json(review, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}