"use server"

import prisma from "@/lib/prisma"

const getAllCards = async (page: number = 1, limit: number = 10) => {
  try {
    const skip = (page - 1) * limit
    const cards = await prisma.card.findMany({
      skip: skip,
      take: limit,
      include: {
        Collection: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })
    return cards
  } catch (error: any) {
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message }
    return { error: "Something went wrong!" }
  }
}

export default getAllCards
