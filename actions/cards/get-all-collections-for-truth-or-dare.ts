"use server"

import prisma from "@/lib/prisma"

const getAllCollectionsForTruthOrDare = async () => {
  try {
    const edition = await prisma.edition.findFirst({
      where: {
        name: "Prawda czy Wyzwanie",
      },
    })
    if (!edition) return { error: "Edition not found!" }

    const result = await prisma.collection.findMany({
      where: {
        editionId: edition.id,
      },
    })
    return result
  } catch (error: any) {
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message }
    return { error: "Something went wrong!" }
  }
}

export default getAllCollectionsForTruthOrDare
