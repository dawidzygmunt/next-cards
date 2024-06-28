"use server"
import prisma from "@/lib/prisma"

export const addSingleCard = async (values: {
  type: string
  collectionId: string
  amount: number
  content: string
  punishment: number
}) => {
  try {
    const result = await prisma.card.create({
      data: {
        type: values.type,
        amount: values.amount,
        content: values.content,
        punishment: values.punishment,
        collectionId: values.collectionId,
      },
    })
    return result
  } catch (error: any) {
    console.log(error)

    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message }
    return { error: "Something went wrong!" }
  }
}
