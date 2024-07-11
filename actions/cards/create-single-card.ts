"use server";

import * as z from "zod";
import prisma from "@/lib/prisma";
import { newCardFormSchema } from "@/schemas/new-card-form-schema";

export const createSingleCard = async (
  values: z.infer<typeof newCardFormSchema>
) => {
  try {
    const result = await prisma.card.create({
      data: {
        type: values.type,
        amount: values.amount,
        content: values.content,
        punishment: values.punishment,
        collectionId: values.collectionId,
      },
    });
    return result;
  } catch (error: any) {
    console.log(error);

    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message };
    return { error: "Something went wrong!" };
  }
};
