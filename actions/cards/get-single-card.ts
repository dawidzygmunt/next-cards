"use server";

import prisma from "@/lib/prisma";

const getSingleCard = async (cardId: string) => {
  try {
    const card = await prisma.card.findFirst({
      where: {
        id: cardId,
      },
    });
    if (!card) return { error: "Card not found" };
    return card;
  } catch (error: any) {
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message };
    return { error: "Something went wrong!" };
  }
};

export default getSingleCard;
