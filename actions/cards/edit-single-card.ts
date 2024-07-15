"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { newCardFormSchema } from "@/schemas/new-card-form-schema";
import { revalidatePath } from "next/cache";

const editSingleCard = async (
  cardId: string,
  values: z.infer<typeof newCardFormSchema>
) => {
  try {
    const card = await prisma.card.update({
      where: {
        id: cardId,
      },
      data: {
        type: values.type,
        amount: values.amount,
        content: values.content,
        punishment: values.punishment,
        collectionId: values.collectionId,
      },
    });
    if (!card) return { error: "Card not found" };
    revalidatePath("/admin/all-cards");
    return card;
  } catch (error: any) {
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message };
    return { error: "Something went wrong!" };
  }
};

export default editSingleCard;
