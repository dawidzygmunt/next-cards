"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const deleteSingleCard = async (cardId: string) => {
  try {
    const cards = await prisma.card.delete({
      where: {
        id: cardId,
      },
    });
    revalidatePath("/admin/all-cards");
    return cards;
  } catch (error: any) {
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message };
    return { error: "Something went wrong!" };
  }
};

export default deleteSingleCard;
