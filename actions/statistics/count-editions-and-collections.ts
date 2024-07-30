"use server"

import prisma from "@/lib/prisma"

const countEditionsAndCollections = async () => {
  try {
    const editions = await prisma.edition.count()
    const collections = await prisma.collection.count()

    return {
      editions,
      collections,
    }
  } catch (error: any) {
    if ("errors" in error && error.errors.length > 0)
      return { error: error.errors[0].message }
    return { error: "Something went wrong!" }
  }
}

export default countEditionsAndCollections
