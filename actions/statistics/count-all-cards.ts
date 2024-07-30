"use server"

import prisma from "@/lib/prisma"

const countAllCards = async () => {
  try {
    const allCards = await prisma.card.count()
    const truthCards = await prisma.card.count({
      where: {
        type: "Prawda",
      },
    })
    const dareCards = await prisma.card.count({
      where: {
        type: "Wyzwanie",
      },
    })

    return {
      allCards,
      truthCards,
      dareCards,
    }
  } catch (error: any) {
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message }
    return { error: "Something went wrong!" }
  }
}

export default countAllCards
