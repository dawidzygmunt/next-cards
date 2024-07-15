"use server";

import prisma from "@/lib/prisma";

const getAllCardsUnlimited = async () => {
  try {
    const cards = await prisma.card.findMany({
      include: {
        Collection: true,
      },
    });
    return cards;
  } catch (error: any) {
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message };
    return { error: "Something went wrong!" };
  }
};

export default getAllCardsUnlimited;
